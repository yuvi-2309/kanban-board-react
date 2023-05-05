import styled from "styled-components";

export const KanbanContainer = styled.div`
  display: flex;
  /* align-items: flex-start; */
  margin-top: 3.75rem;
  margin-left: 1.875rem;

  @media (max-width: 400px){
    flex-wrap: wrap;
  }
`;

export const KanbanColumn = styled.div`
  width: 15.625rem;
  background-color: #f4f5f7;
  padding: 0.625rem;
  margin: 1.875rem;
  border-radius: 10px;
  box-shadow: 0 0 2px;
`;

export const KanbanColumnContent = styled.div`
  margin-top: 0.625rem;
`;

export const KanbanColumnTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0.625rem 0 1.25rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  margin-top: 1.875rem;
  left: 3.7rem;
`;
