import { useRouter } from 'next/router';
import Image from 'next/image';
import defaultImage from '/public/images/default-image.png';

interface Question {
  id: number;
  question: string;
  image_url?: string | undefined;
  thumb_url: string;
  published_at: string;
  choices: {
    choice: string;
    votes: number;
  }[];
};

interface QuestionItemProps {
  questions: Question[];
};

const QuestionItem = ({ questions }: QuestionItemProps) => {
  const router = useRouter();

  const handleQuestionClick = (id: number) => {
    router.push(`/questions/${id}`);
  };

  return (
    <div className="question-box">
      {questions.map((question) => (
        <div key={question.id} className="content" onClick={() => handleQuestionClick(question.id)}>
          <div className="image">
            <Image src={question?.image_url ?? defaultImage} alt={question?.question ?? ""} width={120} height={120} />
          </div>
          <div className="title">
            <h2>{question.id} - {question.question}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionItem;
