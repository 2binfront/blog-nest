import * as crypto from 'crypto';

export class UtilService {
  private static readonly TOKEN_STR = process.env.TOKEN_STR;

  // 生成公众号Token
  static generateOfficialAccountToken(): string {
    console.log(UtilService.TOKEN_STR);
    return crypto.createHash('md5').update(UtilService.TOKEN_STR).digest('hex');
  }

  // 导出XML
  static exportXml(kwargs: { [key: string]: any }): string {
    const graphicMsg = `
      <xml>
        <ToUserName><![CDATA[{to_user}]]></ToUserName>
        <FromUserName><![CDATA[{from_user}]]></FromUserName>
        <CreateTime>{create_time}</CreateTime>
        <MsgType><![CDATA[news]]></MsgType>
        <ArticleCount>{art_count}</ArticleCount>
        <Articles>{items}</Articles>
      </xml>
    `;

    const itemTemplate = `
      <item>
        <Title><![CDATA[{msg_str}]]></Title>
        <PicUrl><![CDATA[{picurl}]]></PicUrl>
        <Url><![CDATA[{url}]]></Url>
      </item>
    `;

    const items = [];
    kwargs.product_articles_obj.map((prod_art, i) => {
      const picurl = prod_art.img ? prod_art.img.mobile_image : '';
      if (i === 0) {
        if (picurl) items.push(itemTemplate.replace('{msg_str}', ' ').replace('{picurl}', picurl).replace('{url}', prod_art.url));
        items.push(
          itemTemplate.replace('{msg_str}', prod_art.desc.replace('\\n', '\n')).replace('{picurl}', '').replace('{url}', prod_art.url),
        );
      } else {
        items.push(
          itemTemplate
            .replace('{msg_str}', prod_art.desc.replace('\\n', '\n'))
            .replace('{picurl}', picurl ? `${picurl}/thumbnail/80x` : picurl)
            .replace('{url}', prod_art.url),
        );
      }
    });

    const response = graphicMsg
      .replace('{to_user}', kwargs.openid)
      .replace('{from_user}', kwargs.from_user)
      .replace('{create_time}', String(Math.floor(Date.now() / 1000)))
      .replace('{art_count}', String(items.length))
      .replace('{items}', items.join(''));

    return response;
  }

  // 生成32位UUID
  static generate32Uuid(): string {
    return crypto.randomUUID().replace(/-/g, '');
  }
}
