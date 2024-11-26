export type RequestFilterType = {
    select?: string[] | string,
    where?: Record<string, any>,
    include?: Record<string, any>,
    limit?: number,
    offset?: number,
    orderBy?: Record<string, 'ASC' | 'asc' | 'DESC' | 'desc'>
};