class Bodychecker {
  checkPOSTanswer(body) {
    let result = '';

    const errorMessages = [];

    if (body.label === undefined || body.label === '') errorMessages.push('Field \'label\'' + this.message().empty);
    if (body.correct === undefined) errorMessages.push('Field \'correct\'' + this.message().notIncluded);
    if (typeof body.correct !== 'boolean') errorMessages.push('Field \'correct\' is not boolean type');

    for (let i = 0; i < errorMessages.length; i++) {
      result += errorMessages[i];
      if (i !== errorMessages.length - 1) result += ',';
    }

    return result;
  }

  checkPOSTquestion(body) {
    const errorMessages = [];

    if (body.title === undefined) errorMessages.push('Field \'title\' ' + this.message().notIncluded);
    else if (body.title === '') errorMessages.push('Field \'title\' ' + this.message().empty);

    if (body.description === undefined) { errorMessages.push('Field \'description\' ' + this.message().notIncluded); }
    if (body.image === undefined) { errorMessages.push('Field \'image\' ' + this.message().notIncluded); }
    if (body.time === undefined) { errorMessages.push('Field \'time\' ' + this.message().notIncluded); }
    if (body.answers === undefined) { errorMessages.push('Field \'answers\' [] ' + this.message().notIncluded); }

    let result = '';

    for (let i = 0; i < errorMessages.length; i++) {
      result += errorMessages[i];
      if (i !== errorMessages.length - 1) result += ',';
    }

    return result;
  }

  checkPUTquestionAddAnswer(body) {
    if (body.answerId === undefined) return 'Field \'answerId ' + this.message().notIncluded;
    if (body.answerId === '') return 'Field \'answerId\' ' + this.message().empty;
    return '';
  }

  message() {
    return {
      empty: 'is empty',
      notIncluded: 'is not included'
    };
  }
}

module.exports = Bodychecker;
