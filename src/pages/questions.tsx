import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import axios from 'axios';

import FilterForm from '../../components/FilterForm';
import QuestionItem from '../../components/QuestionItem';
import ButtonBack from '../../components/ButtonBack'
import Button from '../../components/Button'


interface Question {
  id: number;
  question: string;
  image_url: string;
  thumb_url: string;
  published_at: string;
  choices: {
    choice: string;
    votes: number;
  }[];
}

const Questions = ({ questions }: { questions: Question[] }) => {

  const [filter, setFilter] = useState('');
  const [offset, setOffset] = useState(2);
  const [limit, setLimit] = useState(20);


  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleOffsetChange = (value: number) => {
    setOffset(value);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
  };


  return (
    <div className="questions-page">
      <div className='search-box'>
        <FilterForm
          // onFilterChange={handleFilterChange}
          // onOffsetChange={handleOffsetChange}
          // onLimitChange={handleLimitChange}
        />

        <ButtonBack className="outlined-button" title="Home" />
      </div>

      <div className='results-box'>
        <div className='result-share'>
          <h2 className='title'>Results...</h2>
        </div>

        <div className='results-list'>
          <button className='chip'>1. ajsdh kasjhd kajs...  </button>
          <button className='chip'>9. asdlknaskl asd...  </button>
          <button className='chip'>27. asçkdm...  </button>
          <button className='chip'>42. klçansd aksd... </button>
          <button className='chip'>35. as sds sdsds...</button>
          <button className='chip'>52. a ksd asd asd ...  </button>
          <button className='chip'>18. sadk ksadlksadkl ... </button>
          <button className='chip'>42. asd asd ... </button>
          <button className='chip'>35. adas k...</button>

        </div>
        <div className='action'>
          <Button title="Share results" />
        </div>
      </div>

      {questions && <QuestionItem questions={questions} />}
    </div>
  );
};

export default Questions;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { filter, offset, limit } = context.query;
  const response = await axios.get(`${apiUrl}/questions?filter=${filter}&offset=${offset}&limit=${limit}`);
  const questions = response.data;

  return {
    props: {
      questions,
      revalidate: 60,
    },
  };
};
