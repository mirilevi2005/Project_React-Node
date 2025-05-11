const Test = require('../models/Test'); // אם המודל נמצא בתיקיה models

// 1. יצירת מבחן חדש
exports.createTest = async (req, res) => {
    try {
        const { title, questions, teacherId, lastDate ,courseName} = req.body;

        const newTest = new Test({
            title,
            questions,
            teacherId,
            lastDate,
            courseName
        });

        await newTest.save();
        res.status(201).json({ message: 'Test created successfully', test: newTest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create test', error });
    }
};

// 2. קבלת כל המבחנים
exports.getTests = async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).json({ tests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve tests', error });
    }
};

// 3. קבלת מבחן לפי ID
exports.getTestById = async (req, res) => {
    try {
        const testId = req.params.id;
        const test = await Test.findById(testId);

        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        res.status(200).json({ test });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve test', error });
    }
};
exports.getTestByCourse = async (req, res) => {
    try {
        const { courseName } = req.params; 
        const tests = await Test.find({ courseName });

        if (tests.length === 0) {
            return res.status(404).json({ message: 'No tests found for this course' });
        }

        res.status(200).json({ tests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve tests', error });
    }
};

// 4. עדכון מבחן
exports.updateTest = async (req, res) => {
    try {
        const testId = req.params.id;
        const { title, questions, teacherId, lastDate } = req.body;

        const updatedTest = await Test.findByIdAndUpdate(
            testId,
            { title, questions, teacherId, lastDate },
            { new: true } // מחזיר את המבחן המעודכן
        );

        if (!updatedTest) {
            return res.status(404).json({ message: 'Test not found' });
        }

        res.status(200).json({ message: 'Test updated successfully', test: updatedTest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update test', error });
    }
};

// 5. מחיקת מבחן
exports.deleteTest = async (req, res) => {
    try {
        const testId = req.params.id;
        const deletedTest = await Test.findByIdAndDelete(testId);

        if (!deletedTest) {
            return res.status(404).json({ message: 'Test not found' });
        }

        res.status(200).json({ message: 'Test deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete test', error });
    }
};
