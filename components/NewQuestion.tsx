import { useState } from "react";
import { supabase } from "../lib/supabase";

type Props = {
    onCancel: () => void;
};

const NewQuestion = ({ onCancel }: Props) => {
    const [question, setQuestion] = useState<string>("");
    const [choice1, setChoice1] = useState<string>("");
    const [choice2, setChoice2] = useState<string>("");
    const [choice3, setChoice3] = useState<string>("");
    const [choice4, setChoice4] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const { data, error } = await supabase.from("questions").insert({
                question,
                choices: [
                    { choice: choice1, votes: 0 },
                    { choice: choice2, votes: 0 },
                    { choice: choice3, votes: 0 },
                    { choice: choice4, votes: 0 },
                ],
                image_url: imageUrl,
                thumb_url: imageUrl,
            });

            console.error(error);

            if (error) {
                console.error(error);
                alert("Question created successfully!");
                throw error;
            }

        } catch (error) {
            alert("Error creating question.");
            console.error(error);
            onCancel();
        }
    };

    return (
        <div className="new-question-form">
            <h2>New Question</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="question">Question</label>
                    <input
                        id="question"
                        name="question"
                        type="text"
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="choice1">Choice 1</label>
                    <input
                        id="choice1"
                        name="choice1"
                        type="text"
                        value={choice1}
                        onChange={(event) => setChoice1(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="choice2">Choice 2</label>
                    <input
                        id="choice2"
                        name="choice2"
                        type="text"
                        value={choice2}
                        onChange={(event) => setChoice2(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="choice3">Choice 3</label>
                    <input
                        id="choice3"
                        name="choice3"
                        type="text"
                        value={choice3}
                        onChange={(event) => setChoice3(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="choice4">Choice 4</label>
                    <input
                        id="choice4"
                        name="choice4"
                        type="text"
                        value={choice4}
                        onChange={(event) => setChoice4(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = () => setImageUrl(reader.result as string);
                                reader.readAsDataURL(file);
                            }
                        }}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewQuestion;
