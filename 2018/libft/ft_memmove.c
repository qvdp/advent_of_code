/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memmove.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: qvan-der <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/12 14:26:26 by qvan-der          #+#    #+#             */
/*   Updated: 2018/11/12 20:42:06 by qvan-der         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <string.h>

void				*ft_memmove(void *dst, const void *src, size_t len)
{
	unsigned char	*dst_copy;
	unsigned char	*src_copy;
	size_t			i;

	dst_copy = (unsigned char*)dst;
	src_copy = (unsigned char*)src;
	i = 0;
	if (src < dst)
	{
		while ((int)--len >= 0)
			dst_copy[len] = src_copy[len];
	}
	else
	{
		while (i < len)
		{
			dst_copy[i] = src_copy[i];
			i++;
		}
	}
	return (dst);
}
