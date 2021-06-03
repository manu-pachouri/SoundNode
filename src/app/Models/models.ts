import * as Enums from "./enums";

export class TokenModel{
    access_token : string;
    expires_in : number;
    refresh_token : string;
    scope: string;
    token_type : string;
    timeStamp : Date;
}

export class PagingModel<T>{
    href: string;
    items: Array<T>;
    limit : number;
    next : string;
    offset : number;
    previous: string;
    total : number;
}

export class ExternalUrlModel{
    spotify : string;
}

export class FollowersModel{
    href : string;
    total : string;
}

export class ImageModel{
    height : number;
    width : number;
    url: string;
}

export class ArtistModel{
    external_urls : ExternalUrlModel;
    followers : FollowersModel;
    genres : Array<string>;
    href : string;
    id : number;//the spotify id for the artist
    images : Array<ImageModel>;
    name: string;
    popularity: number;
    type: Enums.ModelType;
    uri: string;//the spotify uri for the artist
}

export class AlbumModel{
    album_type : Enums.AlbumType;
    artists : Array<ArtistModel>;
    available_markets : Array<string>;
    copyrights : Array<CopyRightModel>;
    external_ids : ExternalIdsModel;
    external_urls : ExternalUrlModel;
    genres : Array<string>;
    href : string;
    id : string;
    images : Array<ImageModel>;
    label: string;
    name: string;
    popularity: number;
    releases_data: string;
    releases_date_precision: string;
    restrictions: AlbumRestrictionsModel;
    total_tracks: number;
    tracks: Array<SimplifiedTrackModel>;
    type: Enums.ModelType;
    uri: string;
}

export class CopyRightModel{
    text: string;
    type: 'C'|'P';
}

export class ExternalIdsModel{
    ean: string;
    isrc: string;
    upc: string;
}

export class AlbumRestrictionsModel{
    reason: Enums.StandardRestrictionType
}

export class SimplifiedTrackModel{
    artists: Array<SimplifiedArtistModel>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_url: ExternalUrlModel;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    linked_from: LinkedTrackModel;
    name: string;
    preview_url: string;
    restrictions: TrackRestrictionModel;
    track_number: number;
    type: string;
    uri: string;
}

export class SimplifiedArtistModel{
    external_urls: ExternalUrlModel;
    href: string;
    id: string;
    name: string;
    type: Enums.ModelType;
    uri: string;
}

export class LinkedTrackModel{
    external_urls: ExternalUrlModel;
    href: string;
    id: string;
    type: Enums.ModelType;
    uri: string;
}

export class TrackRestrictionModel{
    reason: Enums.StandardRestrictionType
}

export class PrivateUserModel{
    country: string;
    display_name:string;
    email: string;
    explicit_content: string;
    external_urls: string;
    followers: FollowersModel;
    href: string;
    id: string;
    images: Array<ImageModel>;
    product: string;
    type: Enums.ModelType;
    uri: string;
}

export class PublicUserModel{
    display_name: string;
    external_urls: string;
    followers: FollowersModel;
    href: string;
    id: string;
    images: Array<ImageModel>;
    type: Enums.ModelType;

}

//  PagingModels for all received models from api
export class AlbumsPagingModel<T>{
    albums : PagingModel<T>;
}