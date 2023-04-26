import { useState } from 'react';
import { useRouter } from 'next/router';

const FilterForm = () => {
  const [filter, setFilter] = useState('');
  const [offset, setOffset] = useState(2);
  const [limit, setLimit] = useState(20);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/questions?filter=${filter}&offset=${offset}&limit=${limit}`);
  };

  return (
    <form onSubmit={handleSubmit} className='input-container'>
        <input
          className='input'
          type="text"
          id="filter"
          value={filter}
          placeholder='Filter'
          onChange={(event) => setFilter(event.target.value)}
        />
    </form>
  );
};

export default FilterForm;
