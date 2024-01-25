import axios from 'axios';
import * as cheerio from 'cheerio';
import * as https from 'https';

export async function getLinks(url: string, searchString: string): Promise<string[]> {
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false, // Ignore AAL certificate errors
        })
      const response = await axios.get(url, { httpsAgent: agent });
      const $ = cheerio.load(response.data);
      
      const links: string[] = [];
  
      // Extract links from anchor tags, since iOS is not using POM we have to.. typical iOS.. makes things hard!
      $('a').each((index, element) => {
        const link = $(element).attr('href');
        if (link && link.includes(searchString)) {
            // remove training slash if exists
            links.push(link.replace(/\/$/, ''));
        }
      });
  
      return links;
    } catch (error: any) {
      throw new Error(`Error fetching or parsing the page: ${error.message}`);
    }
}
