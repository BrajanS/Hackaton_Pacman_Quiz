import Question from "../models/question.model.js";

export const createQuestion = async (req, res) => {
    try {
        const {text, options } = req.body;
    
        if (!text || !options || !Array.isArray(options)) { 
          return res.status(400).json({ message : "Tous les champs sont obligatoires."})
        }
        
        const correctCount = options.filter(opt => opt.isCorrect === true).length;
        if (correctCount !== 1) {
          return res.status(400).json({ message: "Il doit y avoir exactement une option correcte." });
        }

        const newQuestion = new Question({ text, options });
        await newQuestion.save();

        res.status(201).json(newQuestion);
    }   catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la question.", error: error.message});
    }
};