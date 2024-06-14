export class PaginationRequestDTO {
  constructor(
    public pageNumber: string | null,
    public perPage: string | null
  ) {}

  append(url: string): string {
    return `${url}?pageNumber=${this.pageNumber ?? 1}&perPage=${this.perPage ?? 10}`;
  }

  nextPage(): this {
    this.pageNumber = (parseInt(this.pageNumber ?? "1") + 1).toString();
    return this;
  }

  previousPage(): this {
    this.pageNumber = Math.max(
      parseInt(this.pageNumber ?? "1") - 1,
      1
    ).toString();
    return this;
  }
}
