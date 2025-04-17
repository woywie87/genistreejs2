// models.ts

// Interfejs dla RevisionBook
export interface IRevisionBook {
    revisionBookId?: string;
    description?: string;
    descriptionBy?: string;
    signature?: string;
    year?: string;
    webLink?: string;
    filmnumber?: string;
    place?: string;
    archive?: string;
    navigationInfo?: string;
    additionalInfo?: string;
    status: number;
    revCount: number;
  }
  
  // Interfejs dla Revision
  export interface IRevision {
    revisionId?: string;
    page?: number;
    pageOriginal?: number;
    createUserId: string;
    place?: string;
    familyInfo?: string;
    description?: string;
    weblink?: string;
    owner?: string;
    geoLat?: string;
    geoLon?: string;
    revisionBook?: IRevisionBook;
    year?: string;
    signature?: string;
    region?: string;
    revisionBookId?: string;
    createdAt?: string;
  }
  
  // Klasa modelu RevisionBook
  export class RevisionBook implements IRevisionBook {
    revisionBookId?: string;
    description?: string;
    descriptionBy?: string;
    signature?: string;
    year?: string;
    webLink?: string;
    filmnumber?: string;
    place?: string;
    archive?: string;
    navigationInfo?: string;
    additionalInfo?: string;
    status: number = 0;
    revCount: number = 0;
  
    constructor(data?: Partial<IRevisionBook>) {
      if (data) {
        Object.assign(this, data);
      }
    }
  
    // Metoda do konwersji z formatu JSON
    static fromJson(json: any): RevisionBook {
      return new RevisionBook({
        revisionBookId: json.$id,
        description: json.Description,
        descriptionBy: json.DescriptionBY,
        signature: json.Signature,
        year: json.Year,
        webLink: json.WebLink,
        filmnumber: json.FilmNumber,
        place: json.Place,
        archive: json.Archive,
        navigationInfo: json.NavigationInfo,
        additionalInfo: json.AdditionalInfo,
        status: json.Status,
        revCount: json.RevCount
      });
    }
  
    // Metoda do konwersji do formatu JSON
    toJson(): Record<string, any> {
      return {
        RevisionBookID: this.revisionBookId,
        Description: this.description,
        DescriptionBY: this.descriptionBy,
        Signature: this.signature,
        Year: this.year,
        WebLink: this.webLink,
        FilmNumber: this.filmnumber,
        Place: this.place,
        Archive: this.archive,
        NavigationInfo: this.navigationInfo,
        AdditionalInfo: this.additionalInfo
      };
    }
  }
  
  // Klasa modelu Revision
  export class Revision implements IRevision {
    revisionId?: string;
    page?: number;
    pageOriginal?: number;
    createUserId: string;
    place?: string;
    familyInfo?: string;
    description?: string;
    weblink?: string;
    owner?: string;
    geoLat?: string;
    geoLon?: string;
    revisionBook?: RevisionBook;
    year?: string;
    signature?: string;
    region?: string;
    revisionBookId?: string;
    createdAt?: string;
  
    constructor(data: Partial<IRevision> & { createUserId: string }) {
      this.createUserId = data.createUserId;
      Object.assign(this, data);
    }
  
    // Metoda do konwersji z formatu JSON
    static fromJson(json: any): Revision {
      const revisionBook = RevisionBook.fromJson(json.revisionBooks);
      
      return new Revision({
        createUserId: json.CreateUserID,
        revisionId: json.$id,
        page: json.PageNumber,
        pageOriginal: json.PageNumberOriginal,
        place: json.Place,
        familyInfo: json.FamilyInfo,
        description: json.Description,
        weblink: json.WebLink,
        owner: json.Owner,
        geoLat: json.GeoLat,
        geoLon: json.GeoLon,
        revisionBook: revisionBook,
        revisionBookId: revisionBook.revisionBookId,
        year: json.Year,
        signature: revisionBook.signature,
        region: json.Region
      });
    }
  
    // Metoda do konwersji do formatu JSON
    toJson(): Record<string, any> {
      return {
        PageNumber: this.page,
        PageNumberOriginal: this.pageOriginal,
        CreateUserID: this.createUserId,
        Place: this.place,
        FamilyInfo: this.familyInfo,
        Description: this.description,
        WebLink: this.weblink,
        Owner: this.owner,
        GeoLat: this.geoLat,
        GeoLon: this.geoLon,
        revisionBooks: this.revisionBookId,
        Year: this.year,
        Signature: this.signature,
        Region: this.region
      };
    }
  }
  
  // Funkcje pomocnicze do parsowania JSON
  
  // Konwertuje obiekt Revision do JSON string
  export function revisionToJson(data: Revision): string {
    return JSON.stringify(data.toJson());
  }
  
  // Konwertuje JSON string na listę obiektów Revision
  export function revisionFromJson(str: string): Revision[] {
    return JSON.parse(str).map((x: any) => Revision.fromJson(x));
  }
  
  // Konwertuje obiekt RevisionBook do JSON string
  export function revisionBookToJson(data: RevisionBook): string {
    return JSON.stringify(data.toJson());
  }
  
  // Konwertuje JSON string na listę obiektów RevisionBook
  export function revisionBookFromJson(str: string): RevisionBook[] {
    return JSON.parse(str).map((x: any) => RevisionBook.fromJson(x));
  }