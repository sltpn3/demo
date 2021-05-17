import axios from 'axios';
import React, { useState, useEffect } from 'react';

const { REACT_APP_API_LOGIN } = process.env;
const { REACT_APP_API_STAT } = process.env;

export function logger(data) {
  if (process.env.NODE_ENV === 'production') return;
  console.log(data);
}

export function YearOptions(props) {
  let years = [];
  const current_year = new Date().getFullYear();
  let options_years = null;
  // console.log(current_year);
  for (let i = 0; i < props.count; ++i) {
    years.push({ id: current_year - i, name: current_year - i })
  }
  // console.log(years);
  options_years = years.map((item, i) => <option key={i} value={item.id}>{item.name}</option>);
  return options_years;
}

export function MonthOptions() {
  const months = [
    { id: '01', name: 'Januari' },
    { id: '02', name: 'Februari' },
    { id: '03', name: 'Maret' },
    { id: '04', name: 'April' },
    { id: '05', name: 'Mei' },
    { id: '06', name: 'Juni' },
    { id: '07', name: 'Juli' },
    { id: '08', name: 'Agustus' },
    { id: '09', name: 'September' },
    { id: '10', name: 'Oktober' },
    { id: '11', name: 'November' },
    { id: '12', name: 'Desember' },
  ]

  let options_months = null;
  options_months = months.map((item, i) => <option key={i} value={item.id}>{item.name}</option>);
  return options_months;

}

export function BuildOptions(props) {
  const data = props.data;
  const value = props.value !== undefined ? props.value : 'value';
  const display_name = props.display_name !== undefined ? props.display_name : 'display_name';
  let options = null;
  if (data) {
    options = data.map((item, i) => <option key={i} value={item[value]}>{item[display_name]}</option>);
  }
  return options;
}

export function PropinsiOptions() {
  return axios.get(REACT_APP_API_LOGIN + "/propinsi").then(result => {
    return result.data.data;
  });
}

export function KotaOptions(props) {
  const propinsi = props.propinsi;
  return axios.get(REACT_APP_API_LOGIN + "/kota/" + propinsi).then(result => {
    return result.data.data
  });
}

export function Stat2ChartData(props) {
  const year = props.year;
  const month = props.month;
  const kota = props.kota;
  return axios.get(REACT_APP_API_STAT + "/stat2", { params: { pub_year: year, pub_month: year + month, kota: kota } }).then(result => {
    let new_case = [];
    let recovered = [];
    let death = [];
    new_case = result.data.data.map((item, i) => item['new_case']);
    recovered = result.data.data.map((item, i) => item['recovered']);
    death = result.data.data.map((item, i) => item['death']);
    console.log(new_case);
    let data = {
      labels: result.data.labels,
      datasets: [
        {
          type: 'bar',
          label: 'New Case',
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgb(54, 162, 235)',
          borderWidth: 0,
          fill: false,
          data: new_case,
        },
        {
          type: 'bar',
          label: 'Recovered',
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)',
          borderWidth: 0,
          fill: false,
          data: recovered,
        },
        {
          type: 'bar',
          label: 'Death',
          borderColor: 'green',
          backgroundColor: 'green',
          borderWidth: 0,
          fill: false,
          data: death,
        },
      ],
    };
    return data
  });
}