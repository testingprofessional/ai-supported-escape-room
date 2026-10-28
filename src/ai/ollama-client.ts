interface OllamaResponse {
    response: string;
    eval_count: number;
    eval_duration: number;
}

export async function vraagAanAI(prompt: string): Promise<string> {
        const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'qwen3:8b-q4_K_M',
            prompt: `/no_think\n${prompt}`,
            think: false,
            stream: false,
            options: {
                num_predict: 60
            }
        })
    });
    if (!response.ok) {
        throw new Error(`Ollama-fout: ${response.status}`);
    }
    const data: OllamaResponse = await response.json();

    const tokensPerSeconde = data.eval_count / (data.eval_duration / 1_000_000_000);

    console.log(`Gegenereerd: ${data.eval_count} tokens`);
    console.log(`Generatiesnelheid: ${tokensPerSeconde.toFixed(2)} tokens/seconde`);

    if (!data.response.trim()) {
        throw new Error('Ollama heeft een leeg antwoord teruggegeven.');
    }
    return data.response;
}