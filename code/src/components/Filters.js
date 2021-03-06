import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { visibilityFilter } from 'reducers/visibilityFilter';

const StyledFilters = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 30px 30px;
  grid-gap: 0.5rem;
  justify-content: center;
  padding: 0rem 0.4rem 0.4rem 0.4rem;

  @media screen and (min-width: 500px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 30px;
  }
`;

const Button = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: ${props =>
    props.activeFilter ? 'rgba(230, 0, 60, 1)' : 'rgba(0, 0, 0, 0.02)'};
  border-radius: 10px;
  color: ${props => (props.activeFilter ? '#FFF' : 'rgba(230, 0, 60, 1)')};
  padding: 0.3rem 0.5rem;
  font-size: 0.7rem;
  font-weight: bold;

  &:disabled {
    opacity: 0.4;
    filter: grayscale(100);
  }

  &:hover:enabled {
    background-color: rgba(230, 0, 60, 1);
    color: white;
    transition: all 150ms ease-in;
    cursor: pointer;
  }
`;

export const Filters = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.visibilityFilter);
  const countAll = useSelector(state => state.todos.length);
  const countActive = useSelector(
    state => state.todos.filter(todo => todo.completed !== true).length
  );
  const countCompleted = useSelector(
    state => state.todos.filter(todo => todo.completed === true).length
  );
  const countPinned = useSelector(
    state => state.todos.filter(todo => todo.pinned === true).length
  );

  return (
    <StyledFilters>
      <Button
        onClick={() =>
          dispatch(
            visibilityFilter.actions.setVisibility({ filter: 'SHOW_ALL' })
          )
        }
        disabled={countAll === 0}
        activeFilter={filter === 'SHOW_ALL'}
      >
        All ({countAll})
      </Button>
      <Button
        onClick={() =>
          dispatch(
            visibilityFilter.actions.setVisibility({ filter: 'SHOW_ACTIVE' })
          )
        }
        disabled={countActive === 0}
        activeFilter={filter === 'SHOW_ACTIVE'}
      >
        Active ({countActive})
      </Button>
      <Button
        onClick={() =>
          dispatch(
            visibilityFilter.actions.setVisibility({ filter: 'SHOW_COMPLETED' })
          )
        }
        disabled={countCompleted === 0}
        activeFilter={filter === 'SHOW_COMPLETED'}
      >
        Completed ({countCompleted})
      </Button>
      <Button
        onClick={() =>
          dispatch(
            visibilityFilter.actions.setVisibility({ filter: 'SHOW_PINNED' })
          )
        }
        disabled={countPinned === 0}
        activeFilter={filter === 'SHOW_PINNED'}
      >
        Pinned ({countPinned})
      </Button>
    </StyledFilters>
  );
};
