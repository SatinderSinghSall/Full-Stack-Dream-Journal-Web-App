const mongoose = require("mongoose");
const Dream = require("./models/Dream");

// Connect to your DB
mongoose.connect("mongodb://127.0.0.1:27017/Dream-Journal-DB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to Dream-Journal-DB");

  const dreams = [
    {
      user: "68dbdad5917a6c5b92ad6ebb",
      title: "Flying over mountains",
      content:
        "I was soaring above the mountains, feeling free and unstoppable.",
      dateOfDream: new Date("2025-09-25"),
      tags: ["Flying", "Adventure"],
      mood: "Exciting",
      rating: 5,
    },
    {
      user: "68dbdad5917a6c5b92ad6ebb",
      title: "Lost in a maze",
      content:
        "I was wandering in an endless maze, feeling anxious and confused.",
      dateOfDream: new Date("2025-09-24"),
      tags: ["Confusion", "Nightmare"],
      mood: "Scary",
      rating: 3,
    },
    {
      user: "68dbdad5917a6c5b92ad6ebb",
      title: "Talking animals",
      content: "Animals could talk and gave me advice about life.",
      dateOfDream: new Date("2025-09-23"),
      tags: ["Talking animals", "Surreal"],
      mood: "Happy",
      rating: 4,
    },
    {
      user: "68dbdad5917a6c5b92ad6ebb",
      title: "Falling into the void",
      content: "I was falling endlessly into a dark void, feeling fear.",
      dateOfDream: new Date("2025-09-22"),
      tags: ["Falling", "Fear"],
      mood: "Scary",
      rating: 2,
    },
    {
      user: "68dbdad5917a6c5b92ad6ebb",
      title: "Meeting a celebrity",
      content: "I met my favorite celebrity and had a friendly conversation.",
      dateOfDream: new Date("2025-09-21"),
      tags: ["Celebrity", "Happy"],
      mood: "Happy",
      rating: 5,
    },
    {
      user: "68dbdad5917a6c5b92ad6ebb",
      title: "Chased by a shadow",
      content: "A shadow was chasing me, and I couldn’t escape.",
      dateOfDream: new Date("2025-09-20"),
      tags: ["Chased", "Nightmare"],
      mood: "Scary",
      rating: 3,
    },
    {
      user: "68dbdad5917a6c5b92ad6ebb",
      title: "Underwater city",
      content:
        "I explored a beautiful city underwater with colorful creatures.",
      dateOfDream: new Date("2025-09-19"),
      tags: ["Underwater", "Adventure"],
      mood: "Exciting",
      rating: 4,
    },
    {
      user: "68dbdad5917a6c5b92ad6ebb",
      title: "Time travel",
      content: "I traveled to the past and saw historical events unfold.",
      dateOfDream: new Date("2025-09-18"),
      tags: ["Time travel", "Adventure"],
      mood: "Neutral",
      rating: 3,
    },
    {
      user: "68dbdad5917a6c5b92ad6ebb",
      title: "Being invisible",
      content: "I could become invisible and explored places unnoticed.",
      dateOfDream: new Date("2025-09-17"),
      tags: ["Invisibility", "Surreal"],
      mood: "Exciting",
      rating: 4,
    },
    {
      user: "68dbdad5917a6c5b92ad6ebb",
      title: "Flying car ride",
      content: "I rode a flying car over a futuristic city.",
      dateOfDream: new Date("2025-09-16"),
      tags: ["Flying", "Futuristic"],
      mood: "Happy",
      rating: 5,
    },
  ];

  try {
    await Dream.insertMany(dreams);
    console.log("10 dreams inserted successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
});
