/* tslint:disable:variable-name */
import {JsonObject, JsonProperty} from "@utils/ObjectMapper";
import moment from 'moment';

@JsonObject('Product')
export class Product {

    @JsonProperty('artistName', String, true)
    private _artistName: string = '';

    @JsonProperty('collectionName', String, true)
    private _collectionName: string = '';

    @JsonProperty('artworkUrl100', String, true)
    private _artworkUrl100: string = '';

    @JsonProperty('shortDescription', String, true)
    private _shortDescription: string = '';

    @JsonProperty('longDescription', String, true)
    private _longDescription: string = '';

    @JsonProperty('releaseDate', String, true)
    private _releaseDate: string = '';

    get artistName(): string {
        return this._artistName;
    }

    get collectionName(): string {
        return this._collectionName;
    }

    get artworkUrl100(): string {
        return this._artworkUrl100;
    }

    get shortDescription(): string {
        return this._shortDescription;
    }

    get releaseDate(): string {
        return this._releaseDate;
    }

    get date(): string {
        return moment(this.releaseDate).format('DD-MM-YYYY');
    }


    get longDescription(): string {
        return this._longDescription;
    }
}
