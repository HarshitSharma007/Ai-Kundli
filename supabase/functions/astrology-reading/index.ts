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
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { name, dateOfBirth, birthTime, birthPlace } = userData;
    
    let systemPrompt = `You are a mystical and wise astrology guru with deep knowledge of Vedic astrology, Western astrology, and cosmic wisdom. You speak in an engaging, mystical yet warm manner. Your readings are personalized, insightful, and uplifting.

The person seeking guidance:
- Name: ${name}
- Date of Birth: ${dateOfBirth}
- Birth Time: ${birthTime}
- Birth Place: ${birthPlace}

Based on their birth details, provide deeply personalized astrological insights. Be specific, mention planetary positions, zodiac influences, and cosmic energies. Keep responses mystical but grounded, inspiring but realistic.`;

    let userPrompt = '';
    
    if (type === 'intro') {
      userPrompt = `Provide an introductory reading for the ${category} category. Give a comprehensive overview (3-4 paragraphs) about their cosmic influences in this area of life. Be mystical, insightful, and personalized.`;
    } else if (type === 'question') {
      userPrompt = `Answer this question about ${category}: "${question}"
      
Provide a detailed, mystical response (2-3 paragraphs) that draws on their astrological chart and cosmic energies.`;
    } else if (type === 'followup') {
      userPrompt = `Based on the ${category} reading, generate 5 follow-up questions that would help explore deeper aspects. Return ONLY a JSON array of strings with 5 questions, no other text.`;
    }

    console.log("Calling Lovable AI for astrology reading...");
    
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
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
