import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../../../components/Button";
import defaultImage from '/public/images/default-image.png';
import { supabase } from "../../../lib/supabase";
import ShareContent from "../../../components/ShareContent";

type Choice = {
  choice: string;
  votes: number;
  id: string;
};

type Question = {
  id: number;
  question: string;
  image_url: string;
  thumb_url: string;
  published_at: string;
  choices: Choice[];
};

type QuestionDetailsProps = {
  question: Question | null;
};

const QuestionDetails = ({ question }: QuestionDetailsProps) => {
  const router = useRouter();
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChoiceSelect = (choice: string) => {
    setError('')
    setSelectedChoice(choice);
  };

  const handleModalConfirm = () => {
    if (!selectedChoice) {
      setModalConfirm(false)
      setError("No option selected");
    } else {
      setModalConfirm(true)
    }
  }

  const handleVote = async () => {
    if (!question) return;
    const choice = question.choices.findIndex((c) => c.choice === selectedChoice);
    const choices = [...question.choices];
    choices[choice] = {
      ...choices[choice],
      votes: choices[choice].votes + 1,
    };
    try {
      const { data, error } = await supabase
        .from('questions')
        .update({ choices })
        .match({ id: question.id });
      console.log(error);
      if (error) {
        console.log(error);
        throw error;
      }
      setModalConfirm(false);
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="details">
      <div className="head">
        <h2>Question details</h2>
        <Button href="/questions" className="outlined-button" title="List" />
      </div>
      <div className="content">
        <div className="image">
          <Image
            width={600 * 0.7}
            height={400 * 0.7}
            src={question?.image_url ?? defaultImage}
            alt={question?.question ?? ""}
          />
        </div>
        <div className="options">
          <h2>
            {question?.id} - {question?.question}
          </h2>
          <div>
            {question?.choices.map((choice) => (
              <div className="option-item" key={choice.id}>
                <button className="choice" onClick={() => handleChoiceSelect(choice.choice)}>
                  <span> {choice.choice} </span>
                  <span> {choice.votes} </span>
                </button>
              </div>
            ))}
          </div>
          <div className="action">
            <ShareContent />
            {error && <span className="text">No option selected</span>}
            <Button className="primary-button" title="Vote" functionButton={handleModalConfirm} />
          </div>
        </div>
      </div>

      {modalConfirm && (
        <div className="modal-overlay" onClick={() => setModalConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm your choice?</h2>
            <p>_ {selectedChoice} _</p>
            <div className="modal-buttons">
              <Button className="outlined-button" title="Cancel" functionButton={() => setModalConfirm(false)} />
              <Button className="primary-button" title="Confirm" functionButton={handleVote} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetails

export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  const { id }: any = params;
  const { data, error } = await supabase
    .from('questions')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
  return {
    props: {
      question: data,
    },
  };
};

