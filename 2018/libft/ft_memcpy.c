/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memcpy.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: qvan-der <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/12 20:25:29 by qvan-der          #+#    #+#             */
/*   Updated: 2018/11/12 20:42:40 by qvan-der         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <string.h>

void					*ft_memcpy(void *dst, const void *src, size_t n)
{
	unsigned char		*dst_copy;
	const unsigned char	*src_copy;
	size_t				i;

	dst_copy = (unsigned char*)dst;
	src_copy = (unsigned char*)src;
	i = 0;
	while (i < n)
	{
		dst_copy[i] = src_copy[i];
		i++;
	}
	return ((unsigned char*)dst);
}
