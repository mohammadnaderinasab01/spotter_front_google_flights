import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";

const Container = styled.div`
  padding: 16px;
  & > h3 {
    font-size: 1.2rem;
  }
  & .item-accordion {
    box-shadow: none;
    border-bottom: 1px solid #dadce0;
    margin: 0;
  }
  & .item-accordion:last-child {
    border: none;
  }
  & > .Mui-expanded {
    margin: 0 !important;
  }
`;

const FAQs = ({ origin }) => {
  const faqList = [
    {
      question: `What is the best airline to fly with from ${origin}?`,
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      id: 1,
    },
    {
      question: `Which cities have direct flights from ${origin}?`,
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      id: 2,
    },
    {
      question: `What are some good flight destinations from ${origin}?`,
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      id: 3,
    },
    {
      question: `What is the best airport to fly out of ${origin}?`,
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      id: 4,
    },
    {
      question: `How long before a flight should I arrive at the airport in ${origin}?`,
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      id: 5,
    },
    {
      question: `How can I find last-minute flight deals from ${origin}?`,
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      id: 6,
    },
    {
      question: `What is the cheapest place to fly from ${origin}?`,
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      id: 7,
    },
  ];

  return (
    <Container>
      <h3>Frequently asked questions about flying from {origin}</h3>
      {faqList.map((faq, index) => (
        // <Accordion key={index}>
        //   <AccordionSummary
        //     expandIcon={<ExpandMoreIcon />}
        //     aria-controls="panel1-content"
        //     id="panel1-header"
        //   >
        //     <Typography component="span">Accordion 1</Typography>
        //   </AccordionSummary>
        //   <AccordionDetails>
        //     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        //     malesuada lacus ex, sit amet blandit leo lobortis eget.
        //   </AccordionDetails>
        // </Accordion>
        <Accordion key={faq.id} className="item-accordion">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQs;
