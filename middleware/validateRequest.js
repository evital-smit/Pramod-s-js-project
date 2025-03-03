const validateRequest = (schema) => {
    return (req, res, next) => {
        if (!schema || typeof schema.validate !== "function") {
            console.error("Schema validation error:", schema);
            return res.status(500).json({ error: "Invalid schema passed for validation." });
        }

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ errors: error.details.map((err) => err.message) });
        }

        next();
    };
};

module.exports = validateRequest;
