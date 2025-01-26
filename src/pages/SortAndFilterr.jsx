import React, { useState, useEffect } from 'react';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';

const SortAndFilter = ({ todos, setFilteredTodos }) => {
  // States for sorting and filtering
  const [filter, setFilter] = useState('all'); // "all", "completed", "not completed", "has due date"
  const [sortOrder, setSortOrder] = useState('asc'); // "asc" or "desc"
  const [sortBy, setSortBy] = useState('added'); // "added" or "due date"

  // Filter function
  const filterTodos = (todos) => {
    if (filter === 'completed') return todos.filter((todo) => todo.completed);
    if (filter === 'not completed') return todos.filter((todo) => !todo.completed);
    if (filter === 'has due date') return todos.filter((todo) => todo.date);
    return todos; // "all" case, return all todos
  };

  // Sorting function
  const sortTodos = (todos) => {
    return todos.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortBy === 'added') {
        // Sorting by added date (assuming "added" is the id or any added timestamp)
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      } else if (sortBy === 'due') {
        // Sorting by due date
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
  };

  // Apply filter and sort to todos
  const handleFilterAndSort = () => {
    let filtered = filterTodos(todos);
    let sorted = sortTodos(filtered);
    setFilteredTodos(sorted); // Set the filtered and sorted todos
  };

  // Handle state change for filter
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Handle state change for sorting order
  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Handle state change for sorting by field (added or due date)
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  // Use useEffect to apply filter and sort whenever filter or sort order changes
  useEffect(() => {
    handleFilterAndSort();
  }, [filter, sortOrder, sortBy, todos]); // Depend on filter, sortOrder, sortBy, and todos

  return (
    <div className="flex justify-between mb-4">
      {/* Filter */}
      <div>
        <select onChange={handleFilterChange} value={filter} className="p-2 border rounded">
          <option value="all">All Todos</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
          <option value="has due date">Has Due Date</option>
        </select>
      </div>

      {/* Sort */}
      <div className="flex items-center space-x-2">
        <select onChange={handleSortByChange} value={sortBy} className="p-2 border rounded">
          <option value="added">Sort by Added Date</option>
          <option value="due">Sort by Due Date</option>
        </select>

        <button
          onClick={handleSortChange}
          className="ml-2 p-2 border rounded flex items-center"
        >
          {sortOrder === 'asc' ? (
            <FaSortAmountUp className="text-green-500" />
          ) : (
            <FaSortAmountDown className="text-green-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SortAndFilter;
