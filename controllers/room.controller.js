const Room = require("../models/room.model");
const User = require("../models/auth.model");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.MAIL_KEY);

exports.readController = (req, res) => {
  const userId = req.params.id;
  Room.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.getAllController = (req, res) => {
  Room.find({}, function (err, users) {
    res.json(users);
  });
};

exports.testController = (req, res) => {
  const tab = ["client", "subs"];
  console.log(tab);
  tab.forEach((el) => {
    console.log(el);
    User.findOne({
      name: el,
    }).exec((err, user) => {
      if (!user) {
        return res.status(400).json({
          errors: "user not found",
        });
      }
    });
  });
};

exports.createController = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const room = new Room({
    name: req.body.name,
    description: req.body.description,
    duration: req.body.duration ? req.body.duration : "00",
    participants: req.body.participants,
    client: req.body.client,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    state: req.body.state,
    link: req.body.link,
  });

  req.body.participants.forEach((el) => {
    User.findOne({
      name: el,
    }).exec((err, user) => {
      if (!user) {
        return res.status(400).json({
          errors: "user not found",
        });
      } else {
        const emailData = {
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Invitation",
          html: `
          <!DOCTYPE html>
          <html
            lang="en"
            xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:v="urn:schemas-microsoft-com:vml"
          >
            <head>
              <title></title>
              <meta charset="utf-8" />
              <meta content="width=device-width,initial-scale=1" name="viewport" />
              <!--[if mso
                ]><xml
                  ><o:OfficeDocumentSettings
                    ><o:PixelsPerInch>96</o:PixelsPerInch
                    ><o:AllowPNG /></o:OfficeDocumentSettings></xml
              ><![endif]-->
              <!--[if !mso]><!-->
              <link
                href="https://fonts.googleapis.com/css?family=Open+Sans"
                rel="stylesheet"
                type="text/css"
              />
              <!--<![endif]-->
              <style>
                * {
                  box-sizing: border-box;
                }
                th.column {
                  padding: 0;
                }
                a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: inherit !important;
                }
                #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
                }
                p {
                  line-height: inherit;
                }
                @media (max-width: 660px) {
                  .icons-inner {
                    text-align: center;
                  }
                  .icons-inner td {
                    margin: 0 auto;
                  }
                  .row-content {
                    width: 100% !important;
                  }
                  .image_block img.big {
                    width: auto !important;
                  }
                  .stack .column {
                    width: 100%;
                    display: block;
                  }
                }
              </style>
            </head>
            <body
              style="
                background-color: #eceff4;
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: none;
                text-size-adjust: none;
              "
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="nl-container"
                role="presentation"
                style="
                  mso-table-lspace: 0;
                  mso-table-rspace: 0;
                  background-color: #eceff4;
                "
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-1"
                        role="presentation"
                        style="mso-table-lspace: 0; mso-table-rspace: 0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="mso-table-lspace: 0; mso-table-rspace: 0"
                                width="640"
                              >
                                <tbody>
                                  <tr>
                                    <th
                                      class="column"
                                      style="
                                        mso-table-lspace: 0;
                                        mso-table-rspace: 0;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                      "
                                      width="100%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            style="
                                              padding-top: 15px;
                                              padding-right: 10px;
                                              padding-bottom: 15px;
                                              padding-left: 10px;
                                            "
                                          >
                                            <div style="font-family: sans-serif">
                                              <div
                                                style="
                                                  font-size: 14px;
                                                  color: #555;
                                                  line-height: 1.2;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: center;
                                                  "
                                                >
                                                  <span style="font-size: 22px"
                                                    ><strong
                                                      >Welcome to Focus Group!</strong
                                                    ></span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                     
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-3"
                        role="presentation"
                        style="mso-table-lspace: 0; mso-table-rspace: 0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  background-color: #fff;
                                "
                                width="640"
                              >
                                <tbody>
                                  <tr>
                                    <th
                                      class="column"
                                      style="
                                        mso-table-lspace: 0;
                                        mso-table-rspace: 0;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                      "
                                      width="100%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            style="
                                              padding-left: 25px;
                                              padding-right: 25px;
                                              padding-top: 40px;
                                            "
                                          >
                                            <div style="font-family: Arial, sans-serif">
                                              <div
                                                style="
                                                  font-size: 12px;
                                                  font-family: 'Open Sans',
                                                    'Helvetica Neue', Helvetica, Arial,
                                                    sans-serif;
                                                  color: #555;
                                                  line-height: 1.2;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: center;
                                                  "
                                                >
                                                  <span style="font-size: 30px"
                                                    ><strong
                                                      >You have been invited!</strong
                                                    ></span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            style="
                                              padding-left: 25px;
                                              padding-right: 25px;
                                              padding-top: 25px;
                                              padding-bottom: 35px;
                                            "
                                          >
                                            <div style="font-family: Arial, sans-serif">
                                              <div
                                                style="
                                                  font-size: 12px;
                                                  font-family: 'Open Sans',
                                                    'Helvetica Neue', Helvetica, Arial,
                                                    sans-serif;
                                                  color: #555;
                                                  line-height: 1.2;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: center;
                                                  "
                                                >
                                                  <span style="font-size: 15px"
                                                    >The session will take place on
                                                    Saturday, July 18, 2020 at 7:00
                                                    pm</span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-4"
                        role="presentation"
                        style="mso-table-lspace: 0; mso-table-rspace: 0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  background-color: #fff;
                                "
                                width="640"
                              >
                                <tbody>
                                  <tr>
                                    <th
                                      class="column"
                                      style="
                                        mso-table-lspace: 0;
                                        mso-table-rspace: 0;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                      "
                                      width="50%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            style="
                                              padding-bottom: 5px;
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              padding-top: 5px;
                                            "
                                          >
                                            <div style="font-family: sans-serif">
                                              <div
                                                style="
                                                  font-size: 12px;
                                                  color: #555;
                                                  line-height: 1.2;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: right;
                                                  "
                                                >
                                                  <strong
                                                    ><span style="font-size: 15px"
                                                      >Name :</span
                                                    >
                                                  </strong>
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                    <th
                                      class="column"
                                      style="
                                        mso-table-lspace: 0;
                                        mso-table-rspace: 0;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                      "
                                      width="50%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            style="
                                              padding-bottom: 5px;
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              padding-top: 5px;
                                            "
                                          >
                                            <div style="font-family: sans-serif">
                                              <div
                                                style="
                                                  font-size: 12px;
                                                  color: #555;
                                                  line-height: 1.2;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: left;
                                                  "
                                                >
                                                  <span style="font-size: 15px"
                                                    >${req.body.name}</span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-5"
                        role="presentation"
                        style="mso-table-lspace: 0; mso-table-rspace: 0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  background-color: #fff;
                                "
                                width="640"
                              >
                                <tbody>
                                  <tr>
                                    <th
                                      class="column"
                                      style="
                                        mso-table-lspace: 0;
                                        mso-table-rspace: 0;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                      "
                                      width="50%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            style="
                                              padding-bottom: 5px;
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              padding-top: 5px;
                                            "
                                          >
                                            <div style="font-family: sans-serif">
                                              <div
                                                style="
                                                  font-size: 12px;
                                                  color: #555;
                                                  line-height: 1.2;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: right;
                                                  "
                                                >
                                                  <strong
                                                    ><span style="font-size: 15px"
                                                      >Code :</span
                                                    ></strong
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                    <th
                                      class="column"
                                      style="
                                        mso-table-lspace: 0;
                                        mso-table-rspace: 0;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                      "
                                      width="50%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            style="
                                              padding-bottom: 5px;
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              padding-top: 5px;
                                            "
                                          >
                                            <div style="font-family: sans-serif">
                                              <div
                                                style="
                                                  font-size: 12px;
                                                  color: #555;
                                                  line-height: 1.2;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: left;
                                                  "
                                                >
                                                  <span style="font-size: 15px"
                                                    >${req.body.link}</span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-6"
                        role="presentation"
                        style="mso-table-lspace: 0; mso-table-rspace: 0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  background-color: #fff;
                                "
                                width="640"
                              >
                                <tbody>
                                  <tr>
                                    <th
                                      class="column"
                                      style="
                                        mso-table-lspace: 0;
                                        mso-table-rspace: 0;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                      "
                                      width="100%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="divider_block"
                                        role="presentation"
                                        style="mso-table-lspace: 0; mso-table-rspace: 0"
                                        width="100%"
                                      >
                                        <tr>
                                          <td style="padding-top: 0; padding-bottom: 0">
                                            <div align="center">
                                              <table
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                  mso-table-lspace: 0;
                                                  mso-table-rspace: 0;
                                                "
                                                width="100%"
                                              >
                                                <tr>
                                                  <td
                                                    class="divider_inner"
                                                    height="35"
                                                    style="
                                                      font-size: 1px;
                                                      line-height: 1px;
                                                      border-top: 0 solid transparent;
                                                    "
                                                  >
                                                    <span></span>
                                                  </td>
                                                </tr>
                                              </table>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-7"
                        role="presentation"
                        style="mso-table-lspace: 0; mso-table-rspace: 0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  background-color: #fff;
                                "
                                width="640"
                              >
                                <tbody>
                                  <tr>
                                    <th
                                      class="column"
                                      style="
                                        mso-table-lspace: 0;
                                        mso-table-rspace: 0;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                      "
                                      width="100%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            style="
                                              padding-bottom: 25px;
                                              padding-left: 25px;
                                              padding-right: 25px;
                                              padding-top: 5px;
                                            "
                                          >
                                          
                                            <div style="font-family: Arial, sans-serif">
                                              <div
                                                style="
                                                  font-size: 12px;
                                                  font-family: 'Open Sans',
                                                    'Helvetica Neue', Helvetica, Arial,
                                                    sans-serif;
                                                  color: #555;
                                                  line-height: 1.2;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: center;
                                                  "
                                                >
                                                  <span style="font-size: 18px"
                                                    >To join the session please click the
                                                    join button then enter the code
                                                    specified above</span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-8"
                        role="presentation"
                        style="mso-table-lspace: 0; mso-table-rspace: 0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  background-color: #fff;
                                "
                                width="640"
                              >
                                <tbody>
                                  <tr>
                                    <th
                                      class="column"
                                      style="
                                        mso-table-lspace: 0;
                                        mso-table-rspace: 0;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                      "
                                      width="100%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="button_block"
                                        role="presentation"
                                        style="mso-table-lspace: 0; mso-table-rspace: 0"
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            style="
                                              padding-top: 15px;
                                              padding-right: 10px;
                                              padding-bottom: 10px;
                                              padding-left: 10px;
                                            "
                                          >
                                          <a href="http://localhost:3000/join">
                                            <div align="center">
                                              <!--[if gte mso 12
                                                ]><style>
                                                  div.btnw {
                                                    display: block !important;
                                                  }
                                                </style>
                                                <div class="btnw" style="display: none">
                                                  <a:roundrect
                                                    xmlns:a="urn:schemas-microsoft-com:vml"
                                                    xmlns:w="urn:schemas-microsoft-com:office:word"
                                                    style="
                                                      v-text-anchor: middle;
                                                      width: 101px;
                                                      height: 42px;
                                                    "
                                                    arcsize="10%"
                                                    stroke="false"
                                                    fillcolor="#3AAEE0"
                                                    ><w:anchorlock /><v:textbox
                                                      inset="0px,0px,0px,0px"
                                                      ><center
                                                        style="
                                                          font-family: sans-serif;
                                                          color: #ffffff;
                                                          font-size: 16px;
                                                        "
                                                      >
                                                        &nbsp; Join&nbsp; :)&nbsp;
                                                      </center></v:textbox
                                                    ></a:roundrect
                                                  >
                                                </div><!
                                              [endif]-->
                                              <!--[if !mso
                                              ]><!--><span
                                                style="
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  background-color: #3aaee0;
                                                  border-radius: 4px;
                                                  color: #fff;
                                                  line-height: 200%;
                                                  width: auto;
                                                  display: inline-block;
                                                  text-align: center;
                                                  text-decoration: none;
                                                "
                                                ><div
                                                  style="
                                                    padding-top: 5px;
                                                    padding-right: 20px;
                                                    padding-bottom: 5px;
                                                    padding-left: 20px;
                                                  "
                                                >
                                                  <div
                                                    style="
                                                      font-size: 12px;
                                                      line-height: 24px;
                                                    "
                                                  >
                                                    <p
                                                      style="
                                                        margin: 0;
                                                        font-size: 16px;
                                                        line-height: 32px;
                                                      "
                                                    >
                                                        Join  :) 
                                                    </p>
                                                  </div>
                                                </div></span
                                              ><!--<![endif]-->
                                            </div>
                                            <a/>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            style="
                                              padding-bottom: 50px;
                                              padding-left: 25px;
                                              padding-right: 25px;
                                              padding-top: 5px;
                                            "
                                          >
                                            <div style="font-family: Arial, sans-serif">
                                              <div
                                                style="
                                                  font-size: 12px;
                                                  font-family: 'Open Sans',
                                                    'Helvetica Neue', Helvetica, Arial,
                                                    sans-serif;
                                                  color: #555;
                                                  line-height: 1.2;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: center;
                                                  "
                                                >
                                                  © All rights reserved 2021
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                     
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- End -->
            </body>
          </html>
          
                   
                `,
        };
        sgMail
          .send(emailData)
          .then((sent) => {
            return res.json({
              message: `Email has been sent to ${email}`,
            });
          })
          .catch((err) => {
            console.log(process.env.MAIL_KEY);
            return res.status(400).json({
              success: false,
              errors: err.toString(),
            });
          });
      }
    });
  });
  room
    .save(room)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};
