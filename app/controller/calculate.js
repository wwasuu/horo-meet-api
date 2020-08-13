const chalk = require("chalk");
const moment = require("moment");
const {
  MonthZodiac,
  SagesTable,
  Element,
  Op,
  QueryTypes,
  sequelize,
  Calendar,
} = require("../model");
const ZodiacData = require("../resource/zodiac.json");
const ElementData = require("../resource/element.json");
const DateData = require("../resource/date.json");
const BMData = require("../resource/bm.json");

// YP = Year Pillar
// R = เศษของการหาร ปี / 60

// MS = ธาตุของแต่ละเดือน
// YS = เลขของธาตุปีนั้นๆ จาการการหา YP
// MB = เลขของธาตุเดือนั้น

// DP = Day Pillar
// R = เศษของการหาร
// Y = ถ้าเกิด 1900-1999 ใช้ตัวเลข 2 ท้าย
// Y = ถ้าเกิด 2000 ขึ้น ใช้ตัวเลข 2 ท้าย + 100
// Y = ถ้าเกิด มกรา กุมภา ให้ - 1
// D = วันเกิด
// BM = ?
// I = 30 เดือนเลขคู่
// I = 0 เดือนเลขคี่

// HS = ((DS * 2) + HB - 2) / 10
// HS = ธาตุของเวลา
// DS = ธาตุของวันนั้น
// HB = นักนักษัตรของวันนั้น
const calculateByDateTime = async (req, res) => {
  try {
    const { year, month, day, time } = req.body;
    const date = `${year}-${month}-${day} ${time}:00`;
    const YP = await calculateYP(year);
    const MS = await calculateMS(YP, date);
    const DP = await calculateDP(year, month, day);
    const HS = await calculateHS(DP, date);
    res.json({
      success: true,
      data: {
        YP,
        MS,
        DP,
        HS,
      },
    });
  } catch (error) {
    console.log("Calculate Controller | Error while call calculate()", error);
    const message = error.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
    res.status(500).json({ statusCode: 500, message, url: req.originalUrl });
  }
};

const calculateByDate = async (req, res) => {
  try {
    const { year, month, day } = req.body;
    const date = `${year}-${month}-${day}`;
    const YP = await calculateYP(year);
    const MS = await calculateMS(YP, date);
    const DP = await calculateDP(year, month, day);
    // await Calendar.create({
    //   date,
    //   zodiac_code: DP.zodiac_code,
    //   element_code: DP.element_code,

    // })
    res.json({
      success: true,
      data: {
        // date,
        YP,
        MS,
        DP,
      },
    });
  } catch (error) {
    console.log("Calculate Controller | Error while call calculate()", error);
    const message = error.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
    res.status(500).json({ statusCode: 500, message, url: req.originalUrl });
  }
} 

calculateYP = async (year) => {
  try {
    const YP = (year % 60) - 3;
    console.log(
      chalk.underline.green("calculateYP: YP"),
      chalk.underline.red(YP)
    );
    return await SagesTable.findOne({
      where: {
        value: YP,
      },
    });
  } catch (error) {
    console.log("Calculate Controller | Error while call calculateYP()", error);
  }
};

calculateMS = async (YP, date) => {
  try {
    console.log(
      chalk.underline.green("calculateMS: YP"),
      chalk.underline.red(YP.value)
    );
    const YSElement = await Element.findOne({
      where: {
        code: YP.element_code,
      },
    });
    const YS = YSElement.value;
    console.log(
      chalk.underline.green("calculateMS: YS"),
      chalk.underline.red(YS)
    );
    // if date month in 12-08 - 02-04
    // ((YP.value * 2 + (monthZodiac.element_value)) % 10);
    const MBElement = await MonthZodiac.findOne({
      where: {
        date_start: {
          [Op.lte]: moment(date).toDate(),
        },
        date_end: {
          [Op.gte]: moment(date).toDate(),
        },
      },
    });
    // const MB = MBElement.element_value;
    const MB = MBElement.zodiac_value;
    console.log(
      chalk.underline.green("calculateMS: MB"),
      chalk.underline.red(MB)
    );
    const MS = (YS * 2 + (MB - 2)) % 10;
    console.log(
      chalk.underline.green("calculateMS: MS"),
      chalk.underline.red(MS)
    );
    return await Element.findOne({
      where: {
        value: MS,
      },
    });
  } catch (error) {
    console.log("Calculate Controller | Error while call calculateMS()", error);
  }
};

calculateDP = async (year, month, day) => {
  try {
    let Y = 0;
    const D = +day;
    const M = +month;
    const BM = BMData[M - 1];
    const I = M % 2 > 0 ? 0 : 30;
    if (+year >= 2000) {
      Y = +`${year}`.slice(-2) + 100;
    } else {
      Y = +`${year}`.slice(-2);
    }
    if (+month <= 2) {
      Y = Y - 1;
    }
    console.log(
      chalk.underline.green("calculateDP: Y"),
      chalk.underline.red(Y)
    );
    console.log(
      chalk.underline.green("calculateDP: D"),
      chalk.underline.red(D)
    );
    console.log(
      chalk.underline.green("calculateDP: M"),
      chalk.underline.red(M)
    );
    console.log(
      chalk.underline.green("calculateDP: BM"),
      chalk.underline.red(BM)
    );
    console.log(
      chalk.underline.green("calculateDP: I"),
      chalk.underline.red(I)
    );
    const DP = (Y * 5 + Math.floor(Y / 4) + 9 + D + BM + I) % 60;
    console.log(
      chalk.underline.green("calculateDP: DP"),
      chalk.underline.red(DP)
    );
    return await SagesTable.findOne({
      where: {
        value: DP,
      },
    });
  } catch (error) {
    console.log("Calculate Controller | Error while call calculateDP()", error);
  }
};

calculateHS = async (DP, date) => {
  const DSElement = await Element.findOne({
    where: {
      value: DP.element_value,
    },
  });

  const DS = DSElement.value;
  const HBZodiac = await sequelize.query(
    `SELECT * FROM time_zodiac WHERE CAST('${moment(date).format(
      "HH:mm:ss"
    )}' AS time) BETWEEN time_start AND time_end`,
    { type: QueryTypes.SELECT }
  );
  const HB = HBZodiac[0].zodiac_value;
  console.log(
    chalk.underline.green("calculateHS: DS"),
    chalk.underline.red(DS)
  );
  console.log(
    chalk.underline.green("calculateHS: HB"),
    chalk.underline.red(HB)
  );
  const HS = (DS * 2 + HB - 2) % 10;

  return Element.findOne({
    where: {
      value: HS,
    },
  });
};

// createMonthZodiac = async () => {
//   const n = 100;
//   const m = 12;
//   let start_year = 1923;
//   let year = 1924;
//   let monthData = [];
//   let elementIndex = 0;
//   for (x = 0; x < n; x++) {
//     for (y = 0; y < m; y++) {
//       const zodiac = ZodiacData[y];
//       const element = ElementData[elementIndex];
//       const date = DateData[y];
//       monthData.push({
//         date_start: (y === 0 ? start_year : year) + "-" + date.date_start,
//         date_end: year + "-" + date.date_end,
//         zodiac_th: zodiac.name_th,
//         zodiac_en: zodiac.name_en,
//         zodiac_code: zodiac.code,
//         zodiac_value: zodiac.value,
//         element_th: element.name_th,
//         element_en: element.name_en,
//         element_code: element.code,
//         element_value: element.value,
//       });
//       elementIndex = elementIndex >= 9 ? 0 : elementIndex + 1;
//     }
//     start_year++;
//     year++;
//   }
//   const o = await MonthZodiac.bulkCreate(monthData);
//   return monthData;
// };

const template = {
  time: {
    element: {
      code: "",
      point: 1,
      actualPoint: 0,
    },
    zodiac: {
      code: "",
      point: 1,
    },
  },
  day: {
    element: {
      code: "",
      point: 1,
    },
    zodiac: {
      code: "",
      point: 1.5,
    },
  },
  month: {
    element: {
      code: "",
      point: 1,
    },
    zodiac: {
      code: "",
      point: 2,
    },
  },
  year: {
    element: {
      code: "",
      point: 1,
    },
    zodiac: {
      code: "",
      point: 1,
    },
  },
};

const calculateWater = (data) => {
  let tmpData = JSON.parse(JSON.stringify(data));
  if (["E5", "E6", "E1", "E2", "E3", "E4"].includes(tmp.time.element.code)) {
    tmpData.time.element.point = 0
  }
  if (["E5", "E6", "E1", "E2", "E3", "E4"].includes(tmp.day.element.code)) {
    tmpData.day.element.point = 0
  }
  if (["E5", "E6", "E1", "E2", "E3", "E4"].includes(tmp.month.element.code)) {
    tmpData.month.element.point = 0
  }
  if (["E5", "E6", "E1", "E2", "E3", "E4"].includes(tmp.year.element.code)) {
    tmpData.year.element.point = 0
  }
  if (["Z2", "Z5"].includes(tmp.time.zodiac.code)) {
    tmpData.time.zodiac.point = tmpData.time.zodiac.point / 2
  }
  if (["Z2", "Z5"].includes(tmp.day.zodiac.code)) {
    tmpData.day.zodiac.point = tmpData.day.zodiac.point / 2

  }
  if (["Z2", "Z5"].includes(tmp.month.zodiac.code)) {
    tmpData.month.zodiac.point = tmpData.month.zodiac.point / 2
  }
  if (["Z2", "Z5"].includes(tmp.year.zodiac.code)) {
    tmpData.year.zodiac.point = tmpData.year.zodiac.point / 2
  }
};

const calculateEarth = () => {};

const calculateGold = () => {};

const calculateFire = () => {};

const calculateWood = () => {};

module.exports = {
  calculateByDateTime,
  calculateByDate
};
