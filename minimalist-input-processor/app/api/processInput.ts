export async function processInputAPI(text: string, image: File | null) {
  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 1500));

  const roasts = [
    "Wow, that idea is so half-baked, it's practically raw.",
    "I've seen better ideas in a fortune cookie.",
    "Your creativity is like a candle in the wind - flickering and about to go out.",
    "That concept is so basic, it probably thinks pumpkin spice is exotic.",
    "If ideas were currency, you'd be filing for bankruptcy.",
  ];

  let response = roasts[Math.floor(Math.random() * roasts.length)];

  if (text) {
    response += ` But hey, at least you wrote ${text.length} characters. That's... something.`;
  }

  if (image) {
    response += ` And thanks for the pic, but I've seen better compositions in a preschool art class.`;
  }

  return { message: response };
}

