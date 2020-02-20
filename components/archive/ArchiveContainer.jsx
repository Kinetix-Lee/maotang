import React from "react"
import Link from "next/link"
import { getRandomKey } from "../../public/static/js/tools"

/* Next.js 的两端数据同步太奇妙了，我就在 Date 类吃了苦头 */

class ArchiveContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    /* 由于两端处理 localDate 的方式不同（Node：yyyy-mm-dd 和 浏览器：yyyy/mm/dd），需要做处理 */
    let { list, count } = this.props.list
    return (
      <div className="wrapper">
        <div className="block article-list archive">
          <ul>
            {list.map(item => (
              <div className="article-item wow fadeIn animated">
                <li key={getRandomKey()} className="archive-item">
                  <Link href={"/archive/" + item.replace("/", "-")}>
                    <a>
                      {item
                        .split("/")
                        .map(item => (item.length == 1 ? "0" + item : item))
                        .join(" 年 ") + " 月"}
                    </a>
                  </Link>
                </li>
                <div className="brief">{(count[item] || 0) + " 篇"}</div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ArchiveContainer
