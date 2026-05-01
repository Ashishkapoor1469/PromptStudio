import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { NextRequest } from 'next/server';

export const maxDuration = 60; // Allow long responses

export async function POST(req: NextRequest) {
  try {
    const { provider, model, prompt, apiKey } = await req.json();

    if (!prompt) {
      return new Response('Prompt is required', { status: 400 });
    }

    let aiModel;

    if (provider === 'openai') {
      if (!apiKey) return new Response('OpenAI API key is required', { status: 401 });
      const openai = createOpenAI({ apiKey });
      aiModel = openai.chat(model);
    } 
    else if (provider === 'anthropic') {
      if (!apiKey) return new Response('Anthropic API key is required', { status: 401 });
      const anthropic = createAnthropic({ apiKey });
      aiModel = anthropic(model);
    }
    else if (provider === 'nvidia') {
      if (!apiKey) return new Response('NVIDIA API key is required', { status: 401 });
      const nvidia = createOpenAI({
        apiKey,
        baseURL: 'https://integrate.api.nvidia.com/v1',
      });
      aiModel = nvidia.chat(model);
    }
    else if (provider === 'google') {
      if (!apiKey) return new Response('Google API key is required', { status: 401 });
      const { createGoogleGenerativeAI } = await import('@ai-sdk/google');
      const google = createGoogleGenerativeAI({ apiKey });
      aiModel = google(model);
    }
    else if (provider === 'mistral') {
      if (!apiKey) return new Response('Mistral API key is required', { status: 401 });
      const { createMistral } = await import('@ai-sdk/mistral');
      const mistral = createMistral({ apiKey });
      aiModel = mistral(model);
    }
    else if (provider === 'ollama') {
      // Ollama provides an OpenAI compatible endpoint natively and works flawlessly with AI SDK v5
      const ollama = createOpenAI({
        apiKey: apiKey && apiKey !== 'ollama' ? apiKey : 'ollama',
        baseURL: 'http://127.0.0.1:11434/v1',
      });
      aiModel = ollama.chat(model);
    }
    else {
      return new Response('Unsupported provider: ' + provider, { status: 400 });
    }

    const result = await streamText({
      model: aiModel,
      prompt: prompt,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response(error.message || 'Internal Server Error', { status: 500 });
  }
}
