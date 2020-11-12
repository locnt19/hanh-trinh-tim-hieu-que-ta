const ThoiGianThi = require("../models/ThoiGianThi");
const DeThi = require("../models/DeThi");
const BaiThi = require("../models/BaiThi");
const User = require("../models/User");
const _ = require("lodash");

Array.prototype.concatAll = function () {
  return [].concat.apply([], this);
};

exports.templateReady = async (req, res) => {
  const user = await User.findOne({ _id: res.locals.user._id });
  if (user.lanThi.luotThi > 0) {
    res.render("ready.pug", { title: "Vòng 1" });
  } else {
    res.redirect("/exams/het-luot");
  }
};

exports.templateReady2 = async (req, res) => {
  const user = await User.findOne({ _id: res.locals.user._id });
  if (user.lanThi.luotThi > 0) {
    res.render("ready-2.pug", { title: "Vòng 2" });
  } else {
    res.redirect("/exams/het-luot");
  }
};

exports.templateReady3 = async (req, res) => {
  const user = await User.findOne({ _id: res.locals.user._id });
  if (user.lanThi.luotThi > 0) {
    res.render("ready-3.pug", { title: "Vòng 3" });
  } else {
    res.redirect("/exams/het-luot");
  }
};

exports.templateReady4 = async (req, res) => {
  const user = await User.findOne({ _id: res.locals.user._id });
  if (user.lanThi.luotThi > 0) {
    res.render("ready-4.pug", { title: "Vòng 4" });
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
        data.questions = randomQuestion.slice(0, 10);
        res.render("section-1.pug", {
          title: "Vòng 1",
          exams: data,
          infoUser: user,
        });
      } else {
        req.flash("message", "Bạn đã thi vòng 1.");
        res.redirect("/exams/ready-2");
      }
    } else {
      res.redirect("/exams/het-luot");
    }
  } catch (error) {
    console.log(error);
    res.render("500.pug", {
      title: "Vòng 1",
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
        const dataImage = await DeThi.findOne({ code: "P020" });
        const randomNumber = Math.floor(
          Math.random() * dataImage.questions.length
        );
        const arrayRandomNumber = randomRange(
          dataImage.questions[randomNumber].trueList.length
        );
        let randomQuestion = [];
        for (var i = 0; i < arrayRandomNumber.length; i++) {
          randomQuestion.push(
            dataImage.questions[randomNumber].trueList[arrayRandomNumber[i]]
          );
        }
        // res.json({
        //   examCode: dataImage.code,
        //   image: dataImage.questions[randomNumber].image,
        //   exams: randomQuestion,
        //   infoUser: user,
        // });
        res.render("section-2.pug", {
          title: "Vòng 2",
          examCode: dataImage.code,
          location: dataImage.questions[randomNumber].location,
          image: dataImage.questions[randomNumber].image,
          exams: randomQuestion,
          infoUser: user,
        });
      } else {
        req.flash("message", "Bạn đã thi vòng 2.");
        res.redirect("/exams/ready-3");
      }
    } else {
      res.redirect("/exams/het-luot");
    }
  } catch (error) {
    console.log(error);
    res.render("500.pug", {
      title: "Vòng 2",
    });
  }
};

exports.templateSection3 = async (req, res) => {
  try {
    const user = await User.findOne({ _id: res.locals.user._id });
    if (user.lanThi.luotThi > 0) {
      if (!user.lanThi.phan3) {
        user.lanThi.phan3 = true;
        await user.save();
        const data = await DeThi.findOne({ code: "P03" });
        const dataImage = await DeThi.findOne({ code: "P030" });
        const datdo = { name: "Đất Đỏ", code: "datdo" };
        const longdien = { name: "Long Điền", code: "longdien" };
        const baria = { name: "Bà Rịa", code: "baria" };
        const vungtau = { name: "Vũng Tàu", code: "vungtau" };
        const condao = { name: "Côn Đảo", code: "condao" };
        const tanthanh = { name: "Phú Mỹ", code: "phumy" };
        const chauduc = { name: "Châu Đức", code: "chauduc" };
        const xuyenmoc = { name: "Xuyên Mộc", code: "xuyenmoc" };
        const brvt = { name: "Bà Rịa Vũng Tàu", code: "brvt" };

        datdo.questions = data.questions.filter((i) => i.location === "datdo");
        longdien.questions = data.questions.filter(
          (i) => i.location === "longdien"
        );
        baria.questions = data.questions.filter((i) => i.location === "baria");
        vungtau.questions = data.questions.filter(
          (i) => i.location === "vungtau"
        );
        condao.questions = data.questions.filter(
          (i) => i.location === "condao"
        );
        tanthanh.questions = data.questions.filter(
          (i) => i.location === "phumy"
        );
        chauduc.questions = data.questions.filter(
          (i) => i.location === "chauduc"
        );
        xuyenmoc.questions = data.questions.filter(
          (i) => i.location === "xuyenmoc"
        );
        brvt.questions = data.questions.filter((i) => i.location === "brvt");

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
        longdien.questions = randomLongDienQuestion.slice(0, 4);

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
        vungtau.questions = randomVungTauQuestion.slice(0, 4);

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
        const indexBRVTRandom = randomRange(brvt.questions.length);
        let randomBRVTQuestion = [];
        for (var i = 0; i < indexBRVTRandom.length; i++) {
          randomBRVTQuestion.push(brvt.questions[indexBRVTRandom[i]]);
        }
        brvt.questions = randomBRVTQuestion.slice(0, 4);

        const arrayData = [
          datdo,
          longdien,
          baria,
          vungtau,
          condao,
          tanthanh,
          chauduc,
          xuyenmoc,
          brvt,
        ];
        const newArr =
          arrayData[Math.floor(Math.random() * arrayData.length)].questions;
        dataImage.questions.forEach((item) => {
          if (item.location === newArr[0].location) {
            newArr.push(item);
            return;
          }
        });
        res.render("section-3.pug", {
          title: "Vòng 3",
          examName: "Vòng 3",
          examCode: data.code,
          arrayData: newArr,
          infoUser: user,
        });
        // res.redirect("/exams/ready-4");
      } else {
        req.flash("message", "Bạn đã thi vòng 3.");
        res.redirect("/exams/ready-4");
      }
    } else {
      res.redirect("/exams/het-luot");
    }
  } catch (error) {
    console.log(error);
    res.render("500.pug", {
      title: "Vòng 3",
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
        const cotA = [];
        const cotB = [];
        let trueList = [];
        data.questions.forEach((item) => {
          cotA.push({ _id: item._id, question: item.question });
          trueList.push(item.trueList);
        });
        trueList = trueList.concatAll();
        const arrayRandomNumber = randomRange(trueList.length);
        arrayRandomNumber.forEach((index) => {
          cotB.push(trueList[index]);
        });
        res.render("section-4.pug", {
          title: "Vòng 4",
          examsCode: data.code,
          cotA: cotA,
          cotB: cotB,
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
      title: "Vòng 4",
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
    baiThi.bestest = true;
    await baiThi.save();
    res.render("summary.pug", {
      title: "Vòng 1",
      examName: "Vòng 1",
      time: baiThi.time,
      scope: baiThi.scope,
      next: "/exams/ready-2",
    });
  } catch (error) {
    console.log(error);
    res.render("500.pug", { title: "Vòng 1" });
  }
};

exports.nopBaiThi2 = async (req, res) => {
  try {
    const data = req.body;
    const deThi = await DeThi.findOne({ code: data.exam });
    let scope = 0;
    let matched = [];
    if (data.location === data.locationAnswer) {
      for (const item of deThi.questions) {
        if (item.location === data.location) {
          for (const subItem of item.trueList) {
            for (const subItem1 of data.answer) {
              if (subItem._id.toString() === subItem1._id.toString()) {
                if (parseInt(subItem.true) === parseInt(subItem1.answer)) {
                  matched.push(true);
                } else {
                  matched.push(false);
                }
              }
            }
          }
        }
      }
      if (!matched.includes(false)) {
        scope = 100;
      }
    }
    const baiThi = new BaiThi({
      user: data.user,
      time: data.time,
      lanThi: data.lanThi,
      exam: data.exam,
      scope: scope,
      rawAnwser: data,
      bestest: true,
    });
    await baiThi.save();
    res.render("summary.pug", {
      title: "Vòng 2",
      examName: "Vòng 2",
      time: baiThi.time,
      scope: baiThi.scope,
      next: "/exams/ready-3",
    });
  } catch (error) {
    console.log(error);
    res.render("500.pug", { title: "Vòng 2" });
  }
};

exports.nopBaiThi3 = async (req, res) => {
  try {
    const data = req.body;
    const baiThi = new BaiThi(data);
    baiThi.bestest = true;
    await baiThi.save();
    res.render("summary.pug", {
      title: "Vòng 3",
      examName: "Vòng 3",
      time: baiThi.time,
      scope: baiThi.scope,
      next: "/exams/ready-4",
    });
  } catch (error) {
    console.log(error);
    res.render("500.pug", { title: "Vòng 3" });
  }
};

exports.nopBaiThi4 = async (req, res) => {
  try {
    const data = req.body;
    const answers = JSON.parse(data.answers);
    const rawDeThi = await DeThi.findOne({ code: data.exam });
    let scope = 0;
    const dapAn = [];
    rawDeThi.questions.forEach((item) => {
      const question = item._id.toString();
      const anwser = [];
      item.trueList.forEach((subItem) => {
        anwser.push(subItem._id.toString());
      });
      dapAn.push({ question: question, anwser: anwser });
    });
    answers.forEach((item) => {
      if (item.anwser.length > 0) {
        dapAn.forEach((subItem) => {
          if (
            item.question === subItem.question &&
            item.anwser.length === subItem.anwser.length
          ) {
            console.log(subItem);
            if (_.isEqual(item.anwser.sort(), subItem.anwser.sort())) {
              scope += 20;
            }
          }
        });
      }
    });
    const baiThi = new BaiThi({
      user: data.user,
      lanThi: data.lanThi,
      exam: data.exam,
      scope: scope,
      rawAnwser: answers,
      bestest: true,
    });
    await baiThi.save();
    const user = await User.findOne({ _id: data.user });
    user.lanThi.luotThi -= 1;
    user.dataDiem.round4.time = 0;
    user.dataDiem.round4.scope = scope;
    await user.save();
    res.render("summary.pug", {
      title: "Vòng 4",
      examName: "Vòng 4",
      time: undefined,
      scope: scope,
      next: "/",
    });
  } catch (error) {
    console.log(error);
    res.render("500.pug", { title: "Vòng 4" });
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
