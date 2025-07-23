import { PaginationAndSortParams } from "../models/PaginationAndSortParams.model";

/**
 * Procesa los parámetros de consulta de una solicitud HTTP para extraer
 * valores de paginación (skip, take) y ordenamiento (sortByColumn, sortDirection).
 *
 * @param query El objeto de consulta de la solicitud (e.g., request.query).
 * @returns Un objeto con los parámetros de paginación y ordenamiento procesados.
 */
export function processQueryParams(query: any): PaginationAndSortParams {
    const params: PaginationAndSortParams = {};

    if (query.skip) {
        const parsedSkip = Number(query.skip);
        if (!isNaN(parsedSkip) && parsedSkip >= 0) {
            params.skip = parsedSkip;
        } else {
            console.warn(`!!!!!!!!!!!!!!!!Valor inválido para 'skip': ${query.skip}. Ignorando.!!!!!!!!!!!!!!!!`);
        }
    }

    if (query.take) {
        const parsedTake = Number(query.take);
        if (!isNaN(parsedTake) && parsedTake > 0) {
            params.take = parsedTake;
        } else {
            console.warn(`Valor inválido para 'take': ${query.take}. Ignorando.`);
        }
    }

    if (query.sortByColumn && typeof query.sortByColumn === 'string') {
        params.sortByColumn = query.sortByColumn;
    }

    if (query.sortDirection && typeof query.sortDirection === 'string') {
        const lowerCaseSortDirection = query.sortDirection.toLowerCase();
        if (lowerCaseSortDirection === 'asc' || lowerCaseSortDirection === 'desc') {
            params.sortDirection = lowerCaseSortDirection;
        } else {
            console.warn(`Valor inválido para 'sortDirection': ${query.sortDirection}. Se esperaba 'asc' o 'desc'. Ignorando.`);
        }
    }

    return params;
}