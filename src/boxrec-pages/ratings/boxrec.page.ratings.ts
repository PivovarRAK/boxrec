import * as cheerio from "cheerio";
import {BoxrecPageRatingsRow} from "./boxrec.page.ratings.row";

/**
 * parse a BoxRec Ratings Page
 * <pre>ex. http://boxrec.com/en/ratings</pre>
 */
export class BoxrecPageRatings {

    private readonly $: CheerioStatic;

    constructor(boxrecBodyString: string) {
        this.$ = cheerio.load(boxrecBodyString);
    }

    get boxers(): BoxrecPageRatingsRow[] {
        return this.parseRatings().map(item => new BoxrecPageRatingsRow(item));
    }

    private parseRatings(): string[] {
        return this.$(".dataTable tbody tr")
            .map((i: number, elem: CheerioElement) => this.$(elem).html())
            .get();
    }

}
