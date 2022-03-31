import React, { useEffect, useState } from "react";
import axios from "axios";
import {Container, Row, Col} from 'react-bootstrap';
import './App.css'

function Navcomp (){
  
  const [firstApiResponse,setFirstApiResponse] = useState([])
  const [secondApiResponse,setSecondApiResponse] = useState([])

  const fetchData = () =>{
    const descApi = "https://www.themealdb.com/api/json/v1/1/categories.php"
    const nameApi = "https://www.themealdb.com/api/json/v1/1/search.php?f=a"

    const getDesc = axios.get(descApi)
    const getName = axios.get(nameApi)

    axios.all([getDesc,getName]).then(
      axios.spread((...allData) =>{
        const allDataDesc = allData[0].data.categories[Math.floor(Math.random()* allData[0].data.categories.length)];
        let description = allDataDesc.strCategoryDescription;
        let categoryImage = allDataDesc.strCategoryThumb;
        const allDataName = allData[1].data.meals[Math.floor(Math.random()* allData[1].data.meals.length)];
        let mealname = allDataName.strMeal;
        let mealImage = allDataName.strMealThumb;


        setFirstApiResponse([description,categoryImage])
        setSecondApiResponse([mealname,mealImage])
      })
    )
  }

  useEffect(() =>{
    fetchData()
  },[])

  return (
    <div>
      <div className="main-block">
      <Container>
        <Row>
          <Col sm={6}>
            <p>
            {firstApiResponse[0]}
            </p>
            
          </Col>
          <Col sm={6}>
            <img src={firstApiResponse[1]} />
          </Col>
        </Row>
      </Container>
      </div>
      <div className="main-block">
       <Container>
        <Row>
          <Col>
            <p>
            {secondApiResponse[0]}
            </p>
            
          </Col>
          <Col>
            <img src={secondApiResponse[1]} />
          </Col>
        </Row>
      </Container> 
      </div>
    </div>

  );
}

export default Navcomp;
