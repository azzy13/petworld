import React, { useEffect, useState } from 'react';
import { Select, Input, Card, Col, Row } from 'antd';
import Moment from 'react-moment';

const { Search } = Input;
const { Option } = Select;

const SearchPets = () => {
  const [searchterm, setSearchterm] = useState('');
  const [pets, setPets] = useState([]);
  const [filterAge, setFilterAge] = useState('');
  const [filteredRes, setFilteredRes] = useState([]);

  useEffect(() => {
    if (filterAge === 'Filter') fetchPetsByAge();
    else fetchPets();
  }, [filterAge]);

  const filterPets = (searchval) => {
    setSearchterm(searchval);
    if (searchterm != '') {
      const filteredPets = pets?.filter((pet) =>
        pet.name.toLowerCase().includes(searchterm.toLowerCase()),
      );
      setFilteredRes(filteredPets);
    } else {
      setFilteredRes(pets);
    }
  };

  const fetchPets = () => {
    fetch(
      'https://60d075407de0b20017108b89.mockapi.io/api/v1/animals?sortBy=createdAt&order=desc',
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPets(data);
      });
  };

  const fetchPetsByAge = () => {
    fetch(
      'https://60d075407de0b20017108b89.mockapi.io/api/v1/animals?sortBy=bornAt&order=desc',
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPets(data);
      });
  };

  return (
    <>
      <div className='container'>
        <h1 className='center'>My Pets</h1>
        <div className='search-pets'>
          <Search
            placeholder='Search pets'
            size='large'
            onChange={(e) => filterPets(e.target.value)}
          />
          <Select
            showSearch
            className='select-pets'
            placeholder='Filter'
            onChange={(value) => setFilterAge(value)}
          >
            <Option value=''>Filter</Option>
            <Option value='Filter'>By Age</Option>
          </Select>
        </div>

        <Row gutter={[32, 32]} className='pet-card-container'>
          {searchterm.length > 1
            ? filteredRes?.map((pet) => (
                <Col xs={24} sm={12} lg={6} className='pet-card' key={pet.id}>
                  <Card
                    title={`${pet.name}`}
                    extra={
                      <img
                        src={`${pet.avatar}`}
                        className='pet-image'
                        alt='img'
                      />
                    }
                  >
                    <h4>
                      Age:{' '}
                      <Moment fromNow ago>
                        {pet.bornAt}
                      </Moment>{' '}
                      old
                    </h4>
                  </Card>
                </Col>
              ))
            : pets?.map((pet) => (
                <Col xs={24} sm={12} lg={6} className='pet-card' key={pet.id}>
                  <Card
                    title={`${pet.name}`}
                    extra={
                      <img
                        src={`${pet.avatar}`}
                        className='pet-image'
                        alt='img'
                      />
                    }
                  >
                    <h4>
                      Age:{' '}
                      <Moment fromNow ago>
                        {pet.bornAt}
                      </Moment>{' '}
                      old
                    </h4>
                  </Card>
                </Col>
              ))}
        </Row>
      </div>
    </>
  );
};

export default SearchPets;
