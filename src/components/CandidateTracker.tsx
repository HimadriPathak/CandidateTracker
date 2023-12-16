import React, { useState } from 'react';
import StarRating from './StarRating';
import './CandidateTracker.css'
import { FaTrash, FaStar } from "react-icons/fa";


interface Candidate {
  name: string;
  interviewStatus: string;
  interviewFeedback: string;
  rating: number;
}

const CandidateTracker: React.FC = () => {
  
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
        name: '',
        interviewStatus: '',
        interviewFeedback: '',
        rating: 0,
    },
    {
        name: '',
        interviewStatus: '',
        interviewFeedback: '',
        rating: 0,
    }
  ]);
  const [newCandidate, setNewCandidate] = useState<Candidate>({
    name: '',
    interviewStatus: '',
    interviewFeedback: '',
    rating: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCandidate((prevCandidate) => ({
      ...prevCandidate,
      [name]: value,
    }));
  };

  const handleAddCandidate = () => {
    setCandidates((prevCandidates) => [...prevCandidates, newCandidate]);
    setNewCandidate({
      name: '',
      interviewStatus: '',
      interviewFeedback: '',
      rating: 0,
    });
  };

  const handleDeleteCandidate = (index: number) => {
    setCandidates((prevCandidates) =>
    prevCandidates.filter((_, i) => i !== index)
  );
    
  };

  const handleEditCandidate = (index: number, field: keyof Candidate, value: any) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate, i) =>
        i === index ? { ...candidate, [field]: value } : candidate
      )
    );
  };


  return (
    <div className='table-wrapper'>
      <div className='add-button'>
        <button onClick={handleAddCandidate}>Add Row</button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Interview Status</th>
            <th className='expand'>Interview Feedback</th>
            <th className='rating'><FaStar /><span>Rating</span></th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="name"
                  value={candidate.name}
                  onChange={(event) =>
                    handleEditCandidate(index, 'name', event.target.value)
                  }
                />
              </td>
              <td>
              <select
                className='label'
                name="interviewStatus"
                value={candidate.interviewStatus}
                onChange={(event) =>
                  handleEditCandidate(index, 'interviewStatus', event.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Complete">Complete</option>
              </select>
              </td>
              <td>
                <input
                  type="text"
                  name="interviewFeedback"
                  value={candidate.interviewFeedback}
                  onChange={(event) =>
                    handleEditCandidate(index, 'interviewFeedback', event.target.value)
                  }
                />
              </td>
              <td>
                <StarRating
                  rating={candidate.rating}
                  onChange={(value) =>
                    handleEditCandidate(index, 'rating', value)
                  }
                />
              </td>
              <td className='actions'>
                <button className='delete-bin' onClick={() => handleDeleteCandidate(index)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default CandidateTracker;
