import apiUrl from '../apiConfig'
import axios from 'axios'

export const createCodeQuiz = (form, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/codeQuizs',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      codeQuiz: {
        title: form.title,
        text: form.text
      }
    }
  })
}

export const indexCodeQuizs = () => {
  return axios({
    url: apiUrl + '/codeQuizs',
    method: 'GET'
    // headers: {
    //   'Authorization': `Token token=${user.token}`
    // }
  })
}

export const showCodeQuiz = (user, codeQuizId) => {
  return axios({
    url: apiUrl + '/codeQuizs/' + codeQuizId,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const deleteCodeQuiz = (user, codeQuizId) => {
  return axios({
    url: apiUrl + '/codeQuizs/' + codeQuizId,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const updateCodeQuiz = (user, form, codeQuizId) => {
  return axios({
    url: apiUrl + '/codeQuizs/' + codeQuizId,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      codeQuiz: {
        title: form.title,
        text: form.text
      }
    }
  })
}
