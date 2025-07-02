import axios from "axios";
import { API } from "..";
import { useEffect, useState } from "react";

const BaseFooter = () => {
  const baseUrl = window.location.port
    ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
    : `${window.location.protocol}//${window.location.hostname}`;

  const [footerData, setFooterData] = useState("");

  useEffect(() => {
    const fetchFooter = async () => {
      const response = await axios.get(`${API}/templates/53/webpage`);
      if (response.data.content_page) {
        setFooterData(response.data.content_page);
      }
    };
    fetchFooter();
  }, []);
  const getUrl = (hrefValue: string) => `${baseUrl}/webpage/${hrefValue}`;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: footerData }}
      style={{ backgroundColor: "rgb(38, 36, 36)" }}
    >
      {/* <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderWidth: "1px",
        }}
      >
        <colgroup>
          <col style={{ width: "14.3017%" }} />
          <col style={{ width: "21.6162%" }} />
          <col style={{ width: "3.97044%" }} />
          <col style={{ width: "17.2626%" }} />
          <col style={{ width: "3.40782%" }} />
          <col style={{ width: "25.4749%" }} />
          <col style={{ width: "13.9665%" }} />
        </colgroup>
        <tbody>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td style={{ verticalAlign: "top" }} rowSpan={2}>
              <a
                style={{ textDecoration: "underline", color: "blue" }}
                href="https://tamice.com/"
              >
                <img
                  src="https://tamice.com/assets/icons/logo.png"
                  width="130"
                  height="49"
                  style={{ float: "right" }}
                />
              </a>
            </td>
            <td>&nbsp;</td>
            <td style={{ verticalAlign: "top" }} rowSpan={2}>
              <p>
                <a
                  style={{ textDecoration: "underline", color: "blue" }}
                  href={getUrl("22")}
                >
                  <span
                    style={{ color: "rgb(236, 240, 241)", fontSize: "10pt" }}
                  >
                    여행약관
                  </span>
                </a>
              </p>
              <p>
                <a
                  style={{ textDecoration: "underline", color: "blue" }}
                  href={getUrl("54")}
                >
                  <span
                    style={{ color: "rgb(236, 240, 241)", fontSize: "10pt" }}
                  >
                    이용약관
                  </span>
                </a>
              </p>
              <p>
                <a
                  style={{ textDecoration: "underline", color: "blue" }}
                  href={getUrl("55")}
                >
                  <span
                    style={{ color: "rgb(236, 240, 241)", fontSize: "10pt" }}
                  >
                    개인정보 처리방침
                  </span>
                </a>
              </p>
              <p>
                <a
                  style={{ textDecoration: "underline", color: "blue" }}
                  href={getUrl("56")}
                >
                  <span
                    style={{ color: "rgb(236, 240, 241)", fontSize: "10pt" }}
                  >
                    취소 및 환불 규정
                  </span>
                </a>
              </p>
            </td>
            <td>&nbsp;</td>
            <td>
              <span style={{ color: "rgb(236, 240, 241)", fontSize: "10pt" }}>
                고객센터 안내
              </span>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>
              <p>
                <span style={{ color: "rgb(236, 240, 241)", fontSize: "10pt" }}>
                  주소
                </span>
              </p>
              <p>
                <span style={{ color: "rgb(236, 240, 241)", fontSize: "10pt" }}>
                  뉴욕본사: 151 West 46th Street, Suite 1002, New York, NY 10036
                </span>
              </p>
              <p>
                <span style={{ color: "rgb(236, 240, 241)", fontSize: "10pt" }}>
                  한국 지사: 서울시 마포구 양화로 7길 6-16 301호
                </span>
              </p>
              <p>&nbsp;</p>
              <p>
                <span style={{ color: "rgb(236, 240, 241)", fontSize: "10pt" }}>
                  전화번호
                </span>
              </p>
              <p>
                <span style={{ color: "rgb(236, 240, 241)", fontSize: "10pt" }}>
                  뉴욕본사:646-684-4848
                </span>
              </p>
              <p>
                <span style={{ color: "rgb(236, 240, 241)", fontSize: "10pt" }}>
                  한국지사: 02-336-4480
                </span>
              </p>
              <p>
                <span style={{ color: "rgb(236, 240, 241)", fontSize: "10pt" }}>
                  이메일: service@tamice.com
                </span>
              </p>
              <p>&nbsp;</p>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td
              style={{ textAlign: "center", backgroundColor: "rgb(0, 0, 0)" }}
              colSpan={7}
            >
              <p>&nbsp;</p>
              <span style={{ color: "rgb(236, 240, 241)", fontSize: "10pt" }}>
                2024 Copyright&copy; tamice.com All right reserved.
              </span>
              <p>&nbsp;</p>
            </td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
};

export default BaseFooter;
