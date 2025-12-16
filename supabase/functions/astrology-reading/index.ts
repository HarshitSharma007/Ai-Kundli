import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userData, category, question, type } = await req.json();
    const AZURE_OPENAI_API_KEY = Deno.env.get("AZURE_OPENAI_API_KEY");
    const AZURE_OPENAI_ENDPOINT = Deno.env.get("AZURE_OPENAI_ENDPOINT");
    const AZURE_OPENAI_DEPLOYMENT = Deno.env.get("AZURE_OPENAI_DEPLOYMENT");
    
    if (!AZURE_OPENAI_API_KEY || !AZURE_OPENAI_ENDPOINT || !AZURE_OPENAI_DEPLOYMENT) {
      throw new Error("Azure OpenAI configuration is missing");
    }

    const { name, dateOfBirth, timeOfBirth, placeOfBirth } = userData;
    
    let systemPrompt = `You are a practical Vedic astrology consultant. Provide direct, factual astrological insights without flowery language or excessive metaphors.

User Details:
- Name: ${name}
- Date of Birth: ${dateOfBirth}
- Birth Time: ${timeOfBirth || 'Not provided'}
- Birth Place: ${placeOfBirth}

Guidelines:
- Use simple, conversational English
- Be specific about planetary positions and their effects
- Skip poetic phrases like "dearest seeker", "cosmic dancer", "tapestry of life"
- Get straight to the point
- Base insights on actual astrological principles
- Keep it practical and actionable`;

    let userPrompt = '';
    
    if (type === 'intro') {
      userPrompt = `Give a direct overview of ${category} for this person. Start immediately with the astrological analysis. No greetings or poetic introductions. Maximum 150 words.`;
    } else if (type === 'question') {
      userPrompt = `Answer directly: "${question}" (Category: ${category})
      
One focused paragraph. No flowery language. Just practical astrological insight.`;
    } else if (type === 'followup') {
      userPrompt = `Based on ${category}, generate 5 specific follow-up questions. Return ONLY a JSON array of strings, no other text.`;
    }

    console.log("Calling Azure OpenAI for astrology reading...");
    
    const apiUrl = `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-08-01-preview`;
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "api-key": AZURE_OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 1000,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    console.log("AI response received successfully");

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in astrology-reading function:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
