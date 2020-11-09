const ThoiGianThi = require("../models/ThoiGianThi");
const DeThi = require("../models/DeThi");
const BaiThi = require("../models/BaiThi");
const User = require("../models/User");

exports.templateReady = async (req, res) => {
  const user = await User.findOne({ _id: res.locals.user._id });
  if (user.lanThi.luotThi > 0) {
    res.render("ready.pug", { title: "Round 1: Trace back the history" });
  } else {
    res.redirect("/exams/het-luot");
  }
};

exports.templateReady2 = async (req, res) => {
  const user = await User.findOne({ _id: res.locals.user._id });
  if (user.lanThi.luotThi > 0) {
    res.render("ready-2.pug", { title: "Round 2: History puzzle" });
  } else {
    res.redirect("/exams/het-luot");
  }
};

exports.templateReady3 = async (req, res) => {
  const user = await User.findOne({ _id: res.locals.user._id });
  if (user.lanThi.luotThi > 0) {
    res.render("ready-3.pug", { title: "Round 3: Exploration" });
  } else {
    res.redirect("/exams/het-luot");
  }
};

exports.templateReady4 = async (req, res) => {
  const user = await User.findOne({ _id: res.locals.user._id });
  if (user.lanThi.luotThi > 0) {
    res.render("ready-4.pug", { title: "Round 4: Matching" });
  } else {
    res.redirect("/exams/het-luot");
  }
};

exports.templateComingSoon = async (req, res) => {
  const data = await ThoiGianThi.findOne({ name: "Đợt 1" });
  res.render("coming-soon.pug", { title: "Coming soon...", time: data });
};

exports.templateSection1 = async (req, res) => {
  try {
    const user = await User.findOne({ _id: res.locals.user._id });
    if (user.lanThi.luotThi > 0) {
      if (!user.lanThi.phan1) {
        user.lanThi.phan1 = true;
        await user.save();
        const data = await DeThi.findOne({ code: "P01" });
        const arrayRandom = randomRange(data.questions.length);
        let randomQuestion = [];
        for (var i = 0; i < arrayRandom.length; i++) {
          randomQuestion.push(data.questions[arrayRandom[i]]);
        }
        data.questions = randomQuestion.slice(0, 15);
        res.render("section-1.pug", {
          title: "Round 1: Trace back the history",
          exams: data,
          infoUser: user,
        });
      } else {
        req.flash("message", "You have passed round 1.");
        res.redirect("/exams/ready-2");
      }
    } else {
      res.redirect("/exams/het-luot");
    }
  } catch (error) {
    console.log(error);
    res.render("500.pug", {
      title: "Round 1: Trace back the history",
    });
  }
};

exports.templateSection2 = async (req, res) => {
  try {
    const user = await User.findOne({ _id: res.locals.user._id });
    if (user.lanThi.luotThi > 0) {
      if (!user.lanThi.phan2) {
        user.lanThi.phan2 = true;
        await user.save();
        const data = await DeThi.findOne({ code: "P02" });
        const dataImage = await DeThi.findOne({ code: "P020" });

        const arrayRandom = randomRange(data.questions.length);
        let randomQuestion = [];
        for (var i = 0; i < arrayRandom.length; i++) {
          randomQuestion.push(data.questions[arrayRandom[i]]);
        }
        randomQuestion = randomQuestion.slice(0, 8);
        randomQuestion.push(
          dataImage.questions[
            Math.floor(Math.random() * dataImage.questions.length)
          ]
        );
        // res.render("section-2.pug", {
        //   title: "Round 2: History puzzle",
        //   examCode: data.code,
        //   exams: randomQuestion,
        //   infoUser: user,
        // });
        res.redirect("/exams/ready-3");
      } else {
        req.flash("message", "You have passed round 2.");
        res.redirect("/exams/ready-3");
      }
    } else {
      res.redirect("/exams/het-luot");
    }
  } catch (error) {
    console.log(error);
    res.render("500.pug", {
      title: "Round 2: History puzzle",
    });
  }
};

exports.templateSection3 = async (req, res) => {
  try {
    const user = await User.findOne({ _id: res.locals.user._id });
    if (user.lanThi.luotThi > 0) {
      if (!user.lanThi.phan3) {
        //     user.lanThi.phan3 = true;
        //     await user.save();
            const data = await DeThi.findOne({ code: 'P03' });
            const datdo = { name: 'Đất Đỏ', code: 'datdo' };
            const longdien = { name: 'Long Điền', code: 'longdien' };
            const baria = { name: 'Bà Rịa', code: 'baria' };
            const vungtau = { name: 'Vũng Tàu', code: 'vungtau' };
            const condao = { name: 'Côn Đảo', code: 'condao' };
            const tanthanh = { name: 'Phú Mỹ', code: 'tanthanh' };
            const chauduc = { name: 'Châu Đức', code: 'chauduc' };
            const xuyenmoc = { name: 'Xuyên Mộc', code: 'xuyenmoc' };

            datdo.questions = data.questions.filter(i => i.location === 'datdo');
            longdien.questions = data.questions.filter(
              i => i.location === 'longdien'
            );
            baria.questions = data.questions.filter(i => i.location === 'baria');
            vungtau.questions = data.questions.filter(
              i => i.location === 'vungtau'
            );
            condao.questions = data.questions.filter(i => i.location === 'condao');
            tanthanh.questions = data.questions.filter(
              i => i.location === 'tanthanh'
            );
            chauduc.questions = data.questions.filter(
              i => i.location === 'chauduc'
            );
            xuyenmoc.questions = data.questions.filter(
              i => i.location === 'xuyenmoc'
            );

            const indexDatDoRandom = randomRange(datdo.questions.length);
            let randomDatDoQuestion = [];
            for (var i = 0; i < indexDatDoRandom.length; i++) {
              randomDatDoQuestion.push(datdo.questions[indexDatDoRandom[i]]);
            }
            datdo.questions = randomDatDoQuestion.slice(0, 4);

            const indexLongDienRandom = randomRange(longdien.questions.length);
            let randomLongDienQuestion = [];
            for (var i = 0; i < indexLongDienRandom.length; i++) {
              randomLongDienQuestion.push(
                longdien.questions[indexLongDienRandom[i]]
              );
            }
            longdien.questions = randomLongDienQuestion.slice(0, 2);

            const indexBaRiaRandom = randomRange(baria.questions.length);
            let randomBaRiaQuestion = [];
            for (var i = 0; i < indexBaRiaRandom.length; i++) {
              randomBaRiaQuestion.push(baria.questions[indexBaRiaRandom[i]]);
            }
            baria.questions = randomBaRiaQuestion.slice(0, 4);

            const indexVungTauRandom = randomRange(vungtau.questions.length);
            let randomVungTauQuestion = [];
            for (var i = 0; i < indexVungTauRandom.length; i++) {
              randomVungTauQuestion.push(vungtau.questions[indexVungTauRandom[i]]);
            }
            vungtau.questions = randomVungTauQuestion.slice(0, 2);

            const indexConDaoRandom = randomRange(condao.questions.length);
            let randomConDaoQuestion = [];
            for (var i = 0; i < indexConDaoRandom.length; i++) {
              randomConDaoQuestion.push(condao.questions[indexConDaoRandom[i]]);
            }
            condao.questions = randomConDaoQuestion.slice(0, 4);

            const indexTanThanhRandom = randomRange(tanthanh.questions.length);
            let randomTanThanhQuestion = [];
            for (var i = 0; i < indexTanThanhRandom.length; i++) {
              randomTanThanhQuestion.push(
                tanthanh.questions[indexTanThanhRandom[i]]
              );
            }
            tanthanh.questions = randomTanThanhQuestion.slice(0, 4);

            const indexChauDucRandom = randomRange(chauduc.questions.length);
            let randomChauDucQuestion = [];
            for (var i = 0; i < indexChauDucRandom.length; i++) {
              randomChauDucQuestion.push(chauduc.questions[indexChauDucRandom[i]]);
            }
            chauduc.questions = randomChauDucQuestion.slice(0, 4);

            const indexXuyenMocRandom = randomRange(xuyenmoc.questions.length);
            let randomXuyenMocQuestion = [];
            for (var i = 0; i < indexXuyenMocRandom.length; i++) {
              randomXuyenMocQuestion.push(
                xuyenmoc.questions[indexXuyenMocRandom[i]]
              );
            }
            xuyenmoc.questions = randomXuyenMocQuestion.slice(0, 4);

            const arrayData = [
              datdo,
              longdien,
              baria,
              vungtau,
              condao,
              tanthanh,
              chauduc,
              xuyenmoc,
            ];

        // res.render("section-3.pug", {
        //   title: "Round 3: Exploration",
        //   examName: "Round 3",
        //   examCode: data.code,
        //   arrayData: arrayData,
        //   infoUser: user,
        // });
        res.redirect("/exams/ready-4");
      } else {
        req.flash("message", "You have passed round 3.");
        res.redirect("/exams/ready-4");
      }
    } else {
      res.redirect("/exams/het-luot");
    }
  } catch (error) {
    console.log(error);
    res.render("500.pug", {
      title: "Round 3: Exploration",
    });
  }
};

exports.templateSection4 = async (req, res) => {
  try {
    const user = await User.findOne({ _id: res.locals.user._id });
    if (user.lanThi.luotThi > 0) {
      if (!user.lanThi.phan4) {
        user.lanThi.phan4 = true;
        await user.save();
        const data = await DeThi.findOne({ code: "P04" });
        const arrayRandom = randomRange(data.questions.length);
        let randomQuestion = [];
        for (var i = 0; i < arrayRandom.length; i++) {
          randomQuestion.push(data.questions[arrayRandom[i]]);
        }
        data.questions = randomQuestion.slice(0, 20);

        const randomIndexAnwser = randomRange(data.questions.length);
        let randomAnwser = [];
        for (var i = 0; i < randomIndexAnwser.length; i++) {
          randomAnwser.push(data.questions[randomIndexAnwser[i]]);
        }
        res.render("section-4.pug", {
          title: "Vòng 4: Hành trình Tìm hiểu quê ta",
          exams: data,
          randomAnwser: randomAnwser,
          infoUser: user,
        });
      } else {
        req.flash("message", "Bạn đã thi vòng 4.");
        res.redirect("/");
      }
    } else {
      res.redirect("/exams/het-luot");
    }
  } catch (error) {
    console.log(error);
    res.render("500.pug", {
      title: "Vòng 4: Hành trình Tìm hiểu quê ta",
    });
  }
};

exports.templateSummary = async (req, res) => {
  res.render("summary.pug", { title: "Kết quả" });
};

exports.nopBaiThi1 = async (req, res) => {
  try {
    const data = req.body;
    const baiThi = new BaiThi(data);
    const deThi = await DeThi.findOne({ code: data.exam });
    const questions = deThi.questions; // array objects
    const userAnswers = baiThi.answers;
    const questionsFilltered = [];
    const anwsersFiltered = [];
    for (const i of questions) {
      questionsFilltered.push({ code: i.code, answer: i.true });
    }
    for (const i of userAnswers) {
      if (i.answer !== null) {
        anwsersFiltered.push({ code: i.code, answer: i.answer });
      }
    }
    const result = compareArray(anwsersFiltered, questionsFilltered);
    baiThi.scope = result.correct.length * 10;
    baiThi.answersTrue = result.correct;

    const baiThiOfUser = await BaiThi.findOne({
      user: data.user,
      exam: data.exam,
    });
    if (baiThiOfUser !== null) {
      if (baiThiOfUser.scope > baiThi.scope) {
        baiThiOfUser.bestest = true;
        baiThi.bestest = false;
      } else {
        // baiThiOfUser.scope <= baiThi.scope
        if (baiThiOfUser.scope === baiThi.scope) {
          if (baiThiOfUser.time > baiThi.time) {
            baiThiOfUser.bestest = false;
            baiThi.bestest = true;
          } else {
            // baiThiOfUser.time <= baiThi.scope
            baiThiOfUser.bestest = true;
            baiThi.bestest = false;
          }
        } else {
          // baiThiOfUser.scope < baiThi.scope
          baiThiOfUser.bestest = false;
          baiThi.bestest = true;
        }
      }
      await baiThiOfUser.save();
    } else {
      baiThi.bestest = true;
    }
    await baiThi.save();
    res.render("summary.pug", {
      title: "Round 1: Trace back the history",
      examName: "Round 1",
      time: baiThi.time,
      scope: baiThi.scope,
      next: "/exams/ready-2",
    });
  } catch (error) {
    console.log(error);
    res.render("500.pug", { title: "ERROR | Round 1: Trace back the history" });
  }
};

exports.nopBaiThi2 = async (req, res) => {
  try {
    const data = req.body;
    const baiThi = new BaiThi(data);
    const deThi = await DeThi.findOne({ code: data.exam });

    const baiThiOfUser = await BaiThi.findOne({
      user: data.user,
      exam: data.exam,
    });
    if (baiThiOfUser !== null) {
      if (baiThiOfUser.scope > baiThi.scope) {
        baiThiOfUser.bestest = true;
        baiThi.bestest = false;
      } else {
        // baiThiOfUser.scope <= baiThi.scope
        if (baiThiOfUser.scope === baiThi.scope) {
          if (baiThiOfUser.time > baiThi.time) {
            baiThiOfUser.bestest = false;
            baiThi.bestest = true;
          } else {
            // baiThiOfUser.time <= baiThi.scope
            baiThiOfUser.bestest = true;
            baiThi.bestest = false;
          }
        } else {
          // baiThiOfUser.scope < baiThi.scope
          baiThiOfUser.bestest = false;
          baiThi.bestest = true;
        }
      }
      await baiThiOfUser.save();
    } else {
      baiThi.bestest = true;
    }
    await baiThi.save();
    res.render("summary.pug", {
      title: "Round 2: History puzzle",
      examName: "Round 2",
      time: baiThi.time,
      scope: baiThi.scope,
      next: "/exams/ready-3",
    });
  } catch (error) {
    console.log(error);
    res.render("500.pug", { title: "ERROR | Round 2: History puzzle" });
  }
};

exports.nopBaiThi3 = async (req, res) => {
  try {
    const data = req.body;
    data.answers = removeNestedArray(req.body.answers);
    const baiThi = new BaiThi(data);
    const deThi = await DeThi.findOne({ code: data.exam });
    const questions = deThi.questions; // array objects
    const userAnswers = baiThi.answers;
    const questionsFilltered = [];
    for (const i of questions) {
      questionsFilltered.push({ code: i.code, answer: i.true });
    }
    const result = compareArray(userAnswers, questionsFilltered);
    var correctPoint = 0;
    var wrongPoint = 0;
    for (const item of result.correct) {
      if (item.star !== null) {
        correctPoint += 20;
      } else {
        correctPoint += 10;
      }
    }
    for (const item of result.wrong) {
      if (item.star !== null) {
        wrongPoint -= 10;
      }
    }

    baiThi.scope = correctPoint + wrongPoint;
    baiThi.answersTrue = result.correct;

    const baiThiOfUser = await BaiThi.findOne({
      user: data.user,
      exam: data.exam,
    });
    if (baiThiOfUser !== null) {
      if (baiThiOfUser.scope > baiThi.scope) {
        baiThiOfUser.bestest = true;
        baiThi.bestest = false;
      } else {
        // baiThiOfUser.scope <= baiThi.scope
        if (baiThiOfUser.scope === baiThi.scope) {
          if (baiThiOfUser.time > baiThi.time) {
            baiThiOfUser.bestest = false;
            baiThi.bestest = true;
          } else {
            // baiThiOfUser.time <= baiThi.scope
            baiThiOfUser.bestest = true;
            baiThi.bestest = false;
          }
        } else {
          // baiThiOfUser.scope < baiThi.scope
          baiThiOfUser.bestest = false;
          baiThi.bestest = true;
        }
      }
      await baiThiOfUser.save();
    } else {
      baiThi.bestest = true;
    }
    await baiThi.save();
    res.render("summary.pug", {
      title: "Round 3: Exploration",
      examName: "Round 3",
      time: baiThi.time,
      scope: baiThi.scope,
      next: "/exams/ready-4",
    });
  } catch (error) {
    console.log(error);
    res.render("500.pug", { title: "ERROR | Round 3: Exploration" });
  }
};

exports.nopBaiThi4 = async (req, res) => {
  try {
    const data = req.body;
    data.scope = 0;
    for (const item of data.answers) {
      if (item.code === item.answer) {
        data.scope += 10;
      }
    }
    const baiThi = new BaiThi(data);
    const deThi = await DeThi.findOne({ code: data.exam });
    const baiThiOfUser = await BaiThi.findOne({
      user: data.user,
      exam: data.exam,
    });
    if (baiThiOfUser !== null) {
      if (baiThiOfUser.scope > baiThi.scope) {
        baiThiOfUser.bestest = true;
        baiThi.bestest = false;
      } else {
        // baiThiOfUser.scope <= baiThi.scope
        if (baiThiOfUser.scope === baiThi.scope) {
          if (baiThiOfUser.time > baiThi.time) {
            baiThiOfUser.bestest = false;
            baiThi.bestest = true;
          } else {
            // baiThiOfUser.time <= baiThi.scope
            baiThiOfUser.bestest = true;
            baiThi.bestest = false;
          }
        } else {
          // baiThiOfUser.scope < baiThi.scope
          baiThiOfUser.bestest = false;
          baiThi.bestest = true;
        }
      }
      await baiThiOfUser.save();
    } else {
      baiThi.bestest = true;
    }
    await baiThi.save();
    const user = await User.findOne({ _id: data.user });
    user.lanThi.phan1 = false;
    user.lanThi.phan2 = false;
    user.lanThi.phan3 = false;
    user.lanThi.phan4 = false;
    user.lanThi.luotThi -= 1;
    await user.save();
    res.render("summary.pug", {
      title: "Round 4: Matching",
      examName: "Round 4",
      time: baiThi.time,
      scope: baiThi.scope,
      next: "/",
    });
  } catch (error) {
    console.log(error);
    res.render("500.pug", { title: "ERROR | Round 4: Matching" });
  }
};

//#region functions
function compareArray(array1, array2) {
  let result = {
    correct: [],
    wrong: [],
  };
  array1.forEach((e1) =>
    array2.forEach((e2) => {
      if (e1.code === e2.code) {
        if (e1.answer === e2.answer) {
          result.correct.push(e1);
        } else {
          result.wrong.push(e1);
        }
      }
    })
  );
  return result;
}

function removeNestedArray(array) {
  var merged = [];

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item.length > 0) {
      for (const iterator of item) {
        merged.push(iterator);
      }
    }
  }
  return merged;
}

function randomRange(length) {
  const results = [];
  const possibleValues = Array.from({ length }, (value, i) => i);
  for (let i = 0; i < length; i += 1) {
    const possibleValuesRange = length - (length - possibleValues.length);
    const randomNumber = Math.floor(Math.random() * possibleValuesRange);
    const normalizedRandomNumber =
      randomNumber !== possibleValuesRange ? randomNumber : possibleValuesRange;
    const [nextNumber] = possibleValues.splice(normalizedRandomNumber, 1);
    results.push(nextNumber);
  }
  return results;
}

//#endregion
