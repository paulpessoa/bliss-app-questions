import { GetServerSideProps } from "next";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import ButtonBack from "../../../components/ButtonBack";
import Button from "../../../components/Button";
import defaultImage from '/public/images/default-image.png';


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type Choice = {
  choice: string;
  votes: number;
};

type Question = {
  id: number;
  question: string;
  image_url: string;
  published_at: string;
  choices: Choice[];
};

type QuestionDetailsProps = {
  question?: Question;
  error?: string;
};

const QuestionDetails = ({ question, error }: QuestionDetailsProps): JSX.Element => {
  const router = useRouter();
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [modalShare, setModalShare] = useState<boolean>(false);

  const handleChoiceSelect = (choice: string) => {
    setSelectedChoice(choice);
  };
  const handleSendEmail = () => {
    alert('Email enviado');
    setModalShare(false);
  };

  const handleModalConfirm = async () => {
    if (!question) return;

    const choiceIndex = question.choices.findIndex((c) => c.choice === selectedChoice);
    const choices = [...question.choices];
    choices[choiceIndex] = {
      ...choices[choiceIndex],
      votes: choices[choiceIndex].votes + 1,
    };

    try {
      await axios.put(`${apiUrl}/questions`, {
        id: question.id,
        choices,
      });
      setModalConfirm(false);
      router.replace(router.asPath);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="details">
      <div className="head">
        <h2>Question details</h2>
        <ButtonBack className="outlined-button" title="Questions List" />
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
            {question?.choices.map((choice, index) => (
              <div className="option-item" key={index}>
                <button className="choice" onClick={() => handleChoiceSelect(choice.choice)}>
                  <span> {choice.choice} </span>
                  <span> {choice.votes} </span>
                </button>
              </div>
            ))}
          </div>
          <div className="action">
            <Button className="outlined-button" title="Share by email" functionButton={() => setModalShare(true)} />
            <Button className="primary-button" title="Vote" disabled={selectedChoice === ''} functionButton={() => setModalConfirm(true)} />
          </div>
        </div>
      </div>

      {modalConfirm && question && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm your choice</h2>
            <p>You are about to vote for {selectedChoice}. Are you sure?</p>
            <div className="modal-buttons">
              <Button className="outlined-button" title="Cancelar" functionButton={() => setModalConfirm(false)} />
              <Button className="primary-button" title="Vote" disabled={selectedChoice === ''} functionButton={() => setModalConfirm(true)} />
            </div>
          </div>
        </div>
      )}

      {modalConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm your choice</h2>
            <p>You are about to vote for {selectedChoice}. Are you sure?</p>
            <div className="modal-buttons">
              <Button className="outlined-button" title="Cancelar" functionButton={() => setModalConfirm(false)} />
              <Button className="primary-button" title="Confirmar" functionButton={handleModalConfirm} />
            </div>
          </div>
        </div>
      )}

      {modalShare && (
        <div className="modal-overlay" onClick={() => setModalShare(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Share by mail</h2>
            <input placeholder="user@mail.com" />
            <Button className="primary-button" title="Enviar" functionButton={() => handleSendEmail()} />
            <div className="modal-buttons">
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default QuestionDetails

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const response = await axios.get(`${apiUrl}/questions/${params?.id}`);
    const question = response.data;

    return {
      props: {
        question,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error,
      },
    };
  }
};