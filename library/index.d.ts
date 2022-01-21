declare module hitomi {
	interface Image {
			index: number;
			hash: string;
			extension: 'jpg' | 'png' | 'gif';
			hasAvif: boolean;
			hasWebp: boolean;
			width: number;
			height: number;
	}

	interface Tag {
			type: 'artist' | 'group' | 'type' | 'language' | 'series' | 'character' | 'male' | 'female' | 'tag';
			name: string;
			isNegative?: boolean;
	}

	interface Gallery {
			id: number;
			title: {
					display: string;
					japanese: string | null;
			};
			type: 'doujinshi' | 'manga' | 'artistcg' | 'gamecg' | 'anime';
			languageName: {
					english: string | null;
					local: string | null;
			};
			artists: string[];
			groups: string[];
			series: string[];
			characters: string[];
			tags: Tag[];
			files: Image[];
			publishedDate: Date;
	}

	type OrderCriteria = 'index' | 'popularity';

	type StartingCharacter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | '123';

	/**
	 * Returns url of image
	 * @param  {Image} image
	 * @param  {Image['extension'] | 'avif' | 'webp'} extension
	 * @param  {object} [options = {}]
	 * @param  {boolean} [options.isThumbnail = false] If set to true, the function will return thumbnail url
	 * @returns {string}
	 */
	function getImageUrl(image: Image, extension: Image['extension'] | 'avif' | 'webp', options: { isThumbnail?: boolean; } = {}): string;

	/**
	 * Returns url of video from gallery
	 * @param  {Gallery} gallery
	 * @returns {string}
	 */
	function getVideoUrl(gallery: Gallery): string;

	/**
	 * Returns url of gallery
	 * @param  {Gallery} gallery
	 * @returns {string}
	 */
	function getGalleryUrl(gallery: Gallery): string;

	/**
	 * Returns nozomi url of tag
	 * @param  {Tag} tag
	 * @param  {object} [option = {}]
	 * @param  {OrderCriteria} [option.orderBy]
	 * @returns {string}
	 */
	function getnozomiUrl(tag: Tag, option?: { orderBy?: OrderCriteria; }): string;

	/**
	* Returns url of tags with specific character
	* @param  {Tag['type']} type
	* @param  {object} [option = {}]
	* @param  {StartingCharacter} [option.startWith] If set and type isn't language nor type, the function will return hitomi url that responds tag that starts with that character
	* @returns {string}
	*/
	function getTagUrl(type: Tag['type'], option: { startWith: StartingCharacter }): string

	/**
	 * Returns index of second thumbnail from gallery
	 * @param  {Gallery} gallery
	 * @returns {number}
	 */
	function getSecondThumbnailIndex(gallery: Gallery): number;

	/**
	 * Returns gallery from id
	 * @param  {number} id
	 * @param  {object} [options = {}]
	 * @param  {boolean} [options.includeFullData = true] If set to false, the function will not return gallery including artists, groups, series, characters
	 * @param  {boolean} [options.includeFiles = true] If set to false, the function will not return gallery including files
	 * @returns {Promise<Gallery>}
	 */
	function getGallery(id: number, options: { includeFullData?: boolean; includeFiles?: boolean; } = {}): Promise<Gallery>;

	/**
	 * Returns ids from range
	 * @param  {object} range
	 * @param  {number} range.startIndex
	 * @param  {number} [range.endIndex] If not set, the function will return whole range from startIndex
	 * @param  {object} [options = {}]
	 * @param  {OrderCriteria} [options.orderBy]
	 * @param  {boolean} [options.reverseResult = false] If set to true, the function will return reversed ids
	 * @returns {Promise<number[]>}
	 */
	function getIds(range: { startIndex: number; endIndex?: number; }, options: { orderBy?: OrderCriteria; reverseResult?: boolean; } = {}): Promise<number[]>;

	/**
	 * Returns tags from string
	 * @param  {string} tagString
	 * @returns {Tag[]}
	 */
	function getParsedTags(tagString: string): Tag[];

	/**
	 * Returns gallery ids from tags
	 * @param  {Tag[]} tags
	 * @returns {Promise<number[]>}
	 */
	function getQueriedIds(tags: Tag[]): Promise<number[]>;

	/**
	 * Returns tag starting with specific character
	 * @param  {Tag['type']} type
	 * @param  {object} [options = {}]
	 * @param  {StartingCharacter} [options.startWith] If set and type isn't language nor type, the function will return tags that responds tag that starts with that character
	 * @returns {Promise<Tag[]>}
	 */
	function getTags(type: Tag['type'], options: { startWith?: StartingCharacter } = {}): Promise<Tag[]>;
}

export default hitomi;