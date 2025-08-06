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

        const newQuestion = new Question({ text, options, createdBy: req.userId });
        await newQuestion.save();

        res.status(201).json(newQuestion);
    }   catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la question.", error: error.message});
    }
};

export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find({ createdBy: req.userId });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recuperation des questions.", error: error.message});
    }
};

export const updateQuestion = async (req,res) => {
    try {
        const questionId = req.params.id;
        const { text, options } = req.body;

        if (!text || !options || !Array.isArray(options)) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires." });
        }
        
        const correctCount = options.filter(opt => opt.isCorrect === true).length;
        if (correctCount !== 1) {
            return res.status(400).json({ message: "Il doit avoir exactement une option correcte" });
        }

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: "Question non trouvée."});
        }

        if (question.createdBy.toString() !== req.userId) {
            return res.status(403).json({ message: "Non autorisé à modifier cette question" });
        }

        question.text = text;
        question.options = options;

        await question.save();

        res.status(200).json({ message: "Question modifiée avec succès.", question });
    }   catch (error) {
        res.status(500).json({ message: "Erreur lors de la modification.", error: error.message });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: "Question non trouvée." });
        }

        if (question.createdBy.toString() !== req.userId) {
            return res.status(403).json({ message: "Non autorisé à supprimer cette question."});
        }

        await question.deleteOne();

        res.status(200).json({ message: "question supprimé avec succès."});
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la supression."});
    }

};
