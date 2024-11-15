/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { api_url } from '../apipath';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ReviewForm({ fetchReviews }) {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

 

  const userName=localStorage.getItem("username")

  const onSubmit = async (data) => {
    try {
     
      const response =await axios.post(`${api_url}/api/reviews/createreview`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      // if(response.ok){
      //   alert("You succesfully submitted review")
      // }
      
      
      
      
      // fetchReviews();
      console.log("Review submitted succesfully",response.data)
     
      alert("You succesfully submitted review")
      reset()

    } catch (error) {
      console.error('Error submitting review:', error);
      alert("You must login first to write a review")
      navigate('/')
      
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-md mb-4">
      <input className="block w-full mb-2 p-2 border" {...register('title')} placeholder="Book Title" required />
      <input className="block w-full mb-2 p-2 border" {...register('author')} placeholder="Author" required />
      <textarea className="block w-full mb-2 p-2 border" {...register('content')} placeholder="Review Content" required></textarea>
      <input className="block w-full mb-2 p-2 border" {...register('reviewer')} value={userName} required />
      <select className="block w-full mb-2 p-2 border" {...register('rating')}>
        <option value="">Rating (1-5)</option>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <button type="submit" className="bg-[#ff742b] text-white p-2 rounded-md">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
