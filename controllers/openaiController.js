const dotenv = require("dotenv");

dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Detect error and give correct solve of this code  from next line \n ${text} `,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        res.status(200).json(data.choices[0].text);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: error.message,
    });
  }
};


exports.codeOptimizer= async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: ` optimize the time and space complexity of this code \n ${text} `,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        res.status(200).json(data.choices[0].text);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: error.message,
    });
  }
};


exports.roadmaps= async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: ` step by step roadmap to learn ${text} and best resources`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        res.status(200).json(data.choices[0].text);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: error.message,
    });
  }
};

exports.help= async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `  ${text} `,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        res.status(200).json(data.choices[0].text);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: error.message,
    });
  }
};