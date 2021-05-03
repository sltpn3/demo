import React, { useState, useEffect } from "react";
import { Input, FormGroup, Label, Button } from 'reactstrap';
import { YearOptions, MonthOptions, BuildOptions, PropinsiOptions, KotaOptions } from '../../libs/Helper';
import axios from 'axios';



function Dashboard1(props) {
  const { REACT_APP_API_LOGIN } = process.env;

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('01');
  const [selectedPropinsi, setSelectedPropinsi] = useState();
  const [selectedKota, setSelectedKota] = useState();
  const [optionsPropinsi, setOptionsPropinsi] = useState();
  const [optionsKota, setOptionsKota] = useState();
  // const propinsi = PropinsiOptions();

  // console.log(propinsi);


  useEffect(() => {
    PropinsiOptions().then(result => {
      // console.log(result);
      setOptionsPropinsi(result);
      setSelectedPropinsi(result[0]['name']);
      // console.log(selectedPropinsi);
    }).catch(e => {
      console.log(e.response);
    });
  }, [])

  useEffect(() => {
    KotaOptions({propinsi: selectedPropinsi}).then(result => {
      // console.log(result);
      setOptionsKota(result);
      setSelectedKota(result[0]['name']);
      // console.log(selectedPropinsi);
    }).catch(e => {
      console.log(e);
    });
  }, [selectedPropinsi])

  const changeYearSelectOptionHandler = (event) => {
    setSelectedYear(event.target.value);
    console.log(selectedYear);
  }

  const changeMonthSelectOptionHandler = (event) => {
    setSelectedMonth(event.target.value);
  }

  const submitHandler = (data) => {
    console.log(selectedYear);
    console.log(selectedMonth);
    console.log(selectedPropinsi);
    console.log(selectedKota);
  }

  const changePropinsiSelectOption = (event) => {
    // console.log(event.target.value)
    setSelectedPropinsi(event.target.value)
    // PropinsiOptions().then(result => {
    //   console.log(result);
    // });
    // console.log(selectedPropinsi)
  }


  return (
    <div>
      <div className="container mt-2 mb-2">Dashboard 1</div>
      <div className="container">
        <div className="row">
          <div className="col-2 bg-secondary">
            <div className="mt-2 mb-2">
              <FormGroup className="mb-2" >
                <Label>Tahun</Label>
                <Input type="select" className="pt-2" onChange={changeYearSelectOptionHandler}>
                  <YearOptions count="5" />
                </Input>
              </FormGroup>
              <FormGroup className="mb-2">
                <Label>Bulan</Label>
                <Input type="select" className="pt-2" onChange={changeMonthSelectOptionHandler}>
                  <MonthOptions />
                </Input>
              </FormGroup>
              <FormGroup className="mb-2">
                <Label>Propinsi</Label>
                <Input type="select" className="pt-2" onChange={changePropinsiSelectOption}>
                  <BuildOptions data={optionsPropinsi} value="name"/>
                </Input>
              </FormGroup>
              <FormGroup >
                <Label>Kota</Label>
                <Input type="select" className="pt-2" onChange={changePropinsiSelectOption}>
                  <BuildOptions data={optionsKota} value="name"/>
                </Input>
              </FormGroup>
              <div className="text-center mt-2"><Button onClick={submitHandler} color="primary">Submit</Button></div>
            </div>
          </div>
          <div className="col">
            <div className="row h-50">
              <div className="col">Cell1</div>
              <div className="col">News
              <div className="overflow-auto h-50">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et libero odio. Phasellus ac sapien dui. Curabitur dictum, eros vitae efficitur volutpat, nibh mauris faucibus purus, vitae commodo turpis diam et ante. Quisque ex mauris, pretium sit amet lacus sed, eleifend viverra diam. Pellentesque sodales, ipsum vestibulum auctor ullamcorper, lorem eros eleifend sapien, ac pharetra nulla sapien ut arcu. Ut sed velit sed ipsum bibendum egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi sit amet purus orci.
                  </p>
                  <p>
                    Nunc ex arcu, aliquam ut neque id, viverra accumsan massa. Duis porttitor fermentum erat ac porta. Donec eleifend lorem quis malesuada bibendum. Sed quis nisl vitae dui varius maximus molestie vitae augue. Ut viverra neque ac nulla pretium dignissim. Nullam a ex a augue cursus cursus. Nam eget venenatis diam. Nam porttitor orci ac vestibulum aliquet. Nunc eleifend maximus nisi eu auctor. Donec rhoncus quam eget enim lobortis vulputate. Proin vitae ex at dolor egestas feugiat. Pellentesque auctor felis vitae pellentesque semper.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">Cell3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard1;