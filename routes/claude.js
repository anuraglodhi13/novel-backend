const Anthropic = require("@anthropic-ai/sdk");
const { CLAUDE_API_KEY } = process.env;
const express = require("express");
const claudeRoute = express.Router();
const dbFile = require("../dbConfig");
const anthropic = new Anthropic({
  apiKey: CLAUDE_API_KEY,
});

claudeRoute.post("/generateNovel", async (req, res) => {
  console.log("<--- generateNovel request came ---->");
  // const dbPrompt = await dbFile.getPrompt();
  // const villainName = req.query.villainName;
  // const actorName = req.query.actorName;
  // const plotTwist = req.query.plotTwist;
  // const finalPrompt = dbPrompt[0].promptValue
  //   .replaceAll("${villainName}", villainName)
  //   .replaceAll("${actorName}", actorName)
  //   .replaceAll("${plotTwist}", plotTwist);
  try {
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: req.body.prompt,
        },
      ],
    });
    res.json({ message: message.content[0].text });
  } catch (err) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the message" });
  }
});

module.exports = claudeRoute;
