import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

export async function processInputAPI(text: string, image: File | null) {
  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 1500));

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 8192,
    temperature: 0,
    system: "Give deadpan comments on the {{input}} - these comments should be dripping with sarcasm. Use a relatively short reply.",
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "<examples>\n<example>\n<input>\nWhat if I create a device that can fly across continents?\n</input>\n<ideal_output>\nCongratulations, you've just invented... the airplane! Or maybe an ambitious paper plane. Einstein bows at your eminence.\n</ideal_output>\n</example>\n</examples>\n\n"
          },
          {
            "type": "text",
            "text": `${text}`
          },
          {
            "type": "image",
            "source": {
              "type": "base64", 
              "media_type": "image/jpeg",
              "data": image ? Buffer.from(await image.arrayBuffer()).toString('base64') : ""
            }
          }
        ]
      }
    ]
  });

  const roasts = [
    "Wow, that idea is so half-baked, it's practically raw.",
    "I've seen better ideas in a fortune cookie.",
    "Your creativity is like a candle in the wind - flickering and about to go out.",
    "That concept is so basic, it probably thinks pumpkin spice is exotic.",
    "If ideas were currency, you'd be filing for bankruptcy.",
  ];

  //let response = roasts[Math.floor(Math.random() * roasts.length)];
  let response = msg.content[0].type === 'text' ? msg.content[0].text : '';

  if (text) {
    response += ` But hey, at least you wrote ${text.length} characters. That's... something.`;
  }

  if (image) {
    response += ` And thanks for the pic, but I've seen better compositions in a preschool art class.`;
  }

  return { message: response };
}

