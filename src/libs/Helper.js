import axios from 'axios';
import React, { useState, useEffect } from 'react';

const { REACT_APP_API_LOGIN } = process.env;

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

export function PropinsiOptions() {
  const [propinsi, setPropinsi] = useState("");
  let options_propinsi = null;
  // console.log("123");

  useEffect(() => {
    axios.get(REACT_APP_API_LOGIN + "/propinsi",
    ).then(result => {
      // console.log(result)
      if (result.status === 200) {
        // console.log(result.data)
        setPropinsi(result.data.data)
        // propinsi = result.data;
      } else {
        // setIsError(true);
      }
    }).catch(e => {
      // setIsError(true);
      console.log(e.response);
      if (e.response) {
        // setErrorMessage(e.response.data.message)
      } else {
        // setErrorMessage('Network Error')
      }
    });
  }, [])
  // getResponse();
  // console.log(propinsi)
  if (propinsi) {
    // console.log(propinsi[0]['name'])
    options_propinsi = propinsi.map((item, i) => <option key={i} value={item.name}>{item.display_name}</option>);
    return options_propinsi;
  } else {
    return null;
  };
}

export function KotaOptions(props) {
  const [kota, setKota] = useState("");
  const propinsi = props.propinsi;
  let options_kota = null;

  // console.log(props)

  useEffect(() => {
    console.log(propinsi);
    axios.get(REACT_APP_API_LOGIN + "/kota/" + propinsi,
    ).then(result => {
      // console.log(result)
      if (result.status === 200) {
        // console.log(result.data)
        setKota(result.data.data)
        // propinsi = result.data;
      } else {
        // setIsError(true);
      }
    }).catch(e => {
      // setIsError(true);
      console.log(e.response);
      if (e.response) {
        // setErrorMessage(e.response.data.message)
      } else {
        // setErrorMessage('Network Error')
      }
    });
  }, [propinsi])

  if (kota) {
    // console.log('success');
    options_kota = kota.map((item, i) => <option key={i} value={item.name}>{item.display_name}</option>);
    console.log(options_kota);
    return options_kota;
  } else {
    console.log('error')
    return null;
  };
}

export function PropinsiKotaOptions() {
  const [propinsi, setPropinsi] = useState("");
  let options_propinsi = null;
  const [kota, setKota] = useState("");
  let options_kota = null;

  useEffect(() => {
    axios.get(REACT_APP_API_LOGIN + "/propinsi",
    ).then(result => {
      // console.log(result)
      if (result.status === 200) {
        console.log(result.data)
        setPropinsi(result.data.data)
        axios.get(REACT_APP_API_LOGIN + "/kota/" + result.data.data[0]['name'],
        ).then(result => {
          if (result.status === 200) {
            setKota(result.data.data)
          } else {

          }
        }).catch(e => {
          if (e.response) {

          } else {

          }
        });
        // propinsi = result.data;
      } else {
        // setIsError(true);
      }
    }).catch(e => {
      // setIsError(true);
      console.log(e.response);
      if (e.response) {
        // setErrorMessage(e.response.data.message)
      } else {
        // setErrorMessage('Network Error')
      }
    });
  }, [])

  if (kota && propinsi) {
    console.log(kota)
    console.log(propinsi)
    options_kota = kota.map((item, i) => <option key={i} value={item.name}>{item.display_name}</option>);
    options_propinsi = propinsi.map((item, i) => <option key={i} value={item.name}>{item.display_name}</option>);
    return [options_propinsi, options_kota]
  }

  return [null, null]
}