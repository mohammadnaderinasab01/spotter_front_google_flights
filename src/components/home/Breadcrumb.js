import styled from "styled-components";

const BreadcrumbWrapper = styled.div`
  margin: 16px;
  padding: 16px;

  .roadmap-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-royal-blue);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    .flight-icon {
      font-size: 16px;
      transform: rotate(90deg);
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-shuttle-gray);

    p {
      color: #000;
    }

    .separator {
      color: var(--color-shuttle-gray);
      font-size: 16px;
    }
  }
`;

export const Breadcrumb = ({ origin }) => {
  return (
    <BreadcrumbWrapper>
      <div className="breadcrumb">
        <a href="#" className="roadmap-link">
          Flights
        </a>
        <span className="separator">›</span>
        <p>From {origin}</p>
      </div>
    </BreadcrumbWrapper>
  );
};
