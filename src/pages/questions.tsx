import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import QuestionItem from '../../components/QuestionItem';
import Button from '../../components/Button'
import ShareContent from '../../components/ShareContent';
import api from '../../api'
import { useRouter } from 'next/router';

interface Question {
  id: number;
  question: string;
  image_url?: string;
  thumb_url: string;
  published_at: string;
  choices: {
    choice: string;
    votes: number;
  }[];
}

interface QuestionsProps {
  questions: {
    filter: string;
  }[];
  paramLimit: number;
  paramOffset: number;
  paramFilter: string;
  initialQuestions: Question[];
}

const Questions = ({ initialQuestions, paramFilter, paramOffset, paramLimit }: QuestionsProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const offset = paramOffset ?? 0
  const limit = paramLimit ?? 10

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState<string>(paramFilter ?? '');
  const [newLimit, setNewLimit] = useState<number>(limit);
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  useEffect(() => {
    //Input focus
    if (router.query.filter !== undefined) {
      inputRef.current?.focus();
    }

    const mql = window.matchMedia("(pointer: coarse)");
    setIsTouchScreen(mql.matches);
    const listener = (e: MediaQueryListEvent) => setIsTouchScreen(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const filtered = initialQuestions.filter((question) => {
      return question.question.toLowerCase().includes(filter.toLowerCase())
    });
    setFilteredQuestions(filtered);
  }, [filter, initialQuestions]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setNewLimit(newLimit + limit);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [newLimit, limit]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true)
      try {
        const response = await api.get(
          `/rest/v1/questions?question=ilike.%25${filter}%25&offset=${offset}&limit=${newLimit}`
        );
        setFilteredQuestions(response.data ?? []);
        setIsLoading(false)
      }
      catch (error) {
        setIsLoading(false)
      }
    };
    fetchQuestions();
  }, [newLimit, filter, offset]);

  const questions: Question[] = filteredQuestions.map((question) => ({
    id: question.id,
    image_url: question.image_url,
    question: question.question,
    thumb_url: '',
    published_at: '',
    choices: question.choices,

  }));

  return (
    <div className="questions-page">
      <div className='search-box'>
        <div className='filter-input'>
          <input className='input'
            ref={inputRef}
            type='text'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder='Filter list...'
          />
          {filter && (
            <Button className='outlined-button' functionButton={() => setFilter('')} title="X" />
          )}
        </div>
        <div className='action'>
          <ShareContent />
          <Button href='/' className='outlined-button' title='Home' />
        </div>
      </div>

      {questions?.length > 0 ? (
        <>
          <QuestionItem questions={questions} />
          {isTouchScreen && filteredQuestions.length > 0 && (
            <div className='load-more'>
              <Button title="Load more" functionButton={() => setNewLimit(newLimit + limit)} />
            </div>
          )}
        </>
      ) : (
        <div className="no-results-container">
          {isLoading ?
            <>
              <p>Loading...</p>
              <Image src="/images/load-bg.gif" alt="No results" width={200} height={200} />
            </>
            :
            <>
              <p>No results found.</p>
              <Image src="/images/searching.svg" alt="No results" width={300} height={300} />
            </>
          }
        </div>
      )}
    </div>
  );
};

export default Questions;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const paramLimit = context.query.limit ?? 10
  const paramOffset = context.query.offset ?? 0
  const paramFilter = context.query.filter ?? ''
  const response = await api.get(`/rest/v1/questions?question=ilike.%25${paramFilter}%25&offset=${paramOffset}&limit=${paramLimit}`);
  const initialQuestions = response.data.map((question: Question) => ({
    question: question.question,
    choices: question.choices
  }));
  return {
    props: {
      paramLimit,
      paramOffset,
      paramFilter,
      initialQuestions,
      revalidate: 60,
    },
  };
};
