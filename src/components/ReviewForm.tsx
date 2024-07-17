import { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ productId }: { productId: number }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = 1; // Example user ID, replace with actual logged in user ID
    await axios.post('/api/reviews', {
      rating,
      comment,
      productId,
      userId,
    });

    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-2">
        <label className="block text-gray-700">Note</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          max={5}
          min={1}
          className="border rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Commentaire</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded-md p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Soumettre
      </button>
    </form>
  );
};

export default ReviewForm;
